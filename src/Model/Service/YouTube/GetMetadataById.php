<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Service\YouTube;

use Laminas\Http\Client;
use Laminas\Http\Client\Exception\RuntimeException;
use Laminas\Http\Response;
use Laminas\Stdlib\ResponseInterface;
use Magento\Framework\App\Cache\StateInterface;
use Magento\Framework\App\CacheInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\SerializerInterface;
use Psr\Log\LoggerInterface;
use Qunity\Video\Model\Cache\YouTubeMetadata;
use Qunity\Video\Model\Config as ModuleConfig;

class GetMetadataById
{
    public const KEY_ID = 'id', KEY_SNIPPET = 'snippet';
    private const REQUEST_GOOGLE_APIS_URL = 'https://www.googleapis.com/youtube/v3/videos';
    private const REQUEST_TIMEOUT = 1;

    /**
     * List of metadata keys to retrieve
     * @var string[]
     */
    private array $metadataKeys = [self::KEY_ID, self::KEY_SNIPPET];

    /**
     * @param CacheInterface $cache
     * @param StateInterface $cacheState
     * @param SerializerInterface $serializer
     * @param LoggerInterface $logger
     * @param ModuleConfig $config
     * @param Client $httpClient
     */
    public function __construct(
        private readonly CacheInterface $cache,
        private readonly StateInterface $cacheState,
        private readonly SerializerInterface $serializer,
        private readonly LoggerInterface $logger,
        private readonly ModuleConfig $config,
        private readonly Client $httpClient
    ) {
        // ...
    }

    /**
     * Get metadata for YouTube video by video ID
     *
     * @param string $videoId
     * @return array
     *
     * @throws LocalizedException|NoSuchEntityException
     */
    public function execute(string $videoId): array
    {
        $cacheId = $this->getCacheId($videoId);
        $isEnabledCache = $this->cacheState->isEnabled(YouTubeMetadata::TYPE_IDENTIFIER);

        if ($isEnabledCache && !empty($data = $this->cache->load($cacheId))) {
            return $this->serializer->unserialize($data);
        }

        $data = $this->getMetadata($videoId);

        if ($isEnabledCache) {
            $json = $this->serializer->serialize($data);
            $this->cache->save($json, $cacheId, [YouTubeMetadata::CACHE_TAG]);
        }

        return $data;
    }

    /**
     * Get metadata for YouTube video by video ID without checking cache
     *
     * @param string $videoId
     * @return array
     *
     * @throws LocalizedException|NoSuchEntityException
     */
    private function getMetadata(string $videoId): array
    {
        try {
            /** @var Response $response */
            $response = $this->request($videoId);
        } catch (RuntimeException $e) {
            $exceptionMessage = 'Failed to get video metadata from YouTube.';
            $context = ['video_id' => $videoId, 'exception_message' => $e->getMessage()];
            $this->logger->critical($exceptionMessage, $context);

            throw new LocalizedException(__($exceptionMessage));
        }

        $data = $this->getResponseBody($response);

        if (!$response->isSuccess()) {
            $exceptionMessage = 'Failed to get video metadata from YouTube.';
            $context = ['video_id' => $videoId, 'error_message' => $data['error']['message']];
            $this->logger->critical($exceptionMessage, $context);

            throw new LocalizedException(__($exceptionMessage));
        }

        if ($data['pageInfo']['totalResults'] == 0) {
            $exceptionMessage = "Video metadata that was requested doesn't exist.";
            $this->logger->critical($exceptionMessage, ['video_id' => $videoId]);

            throw new NoSuchEntityException(__($exceptionMessage));
        }

        return $this->getPreparedMetadata($data);
    }

    /**
     * Execute request to get metadata from YouTube
     *
     * @param string $videoId
     * @return ResponseInterface
     */
    private function request(string $videoId): ResponseInterface
    {
        $part = implode(',', $this->metadataKeys);
        $apiKey = $this->config->getYoutubeVideoApikey();

        $this->httpClient
            ->setUri(self::REQUEST_GOOGLE_APIS_URL)
            ->setOptions(['maxredirects' => 0, 'timeout' => self::REQUEST_TIMEOUT, 'keepalive' => true])
            ->setParameterGet(['part' => $part, 'id' => $videoId, 'key' => $apiKey]);

        return $this->httpClient->send();
    }

    /**
     * Get response body array from response object
     *
     * @param ResponseInterface $response
     * @return array
     */
    private function getResponseBody(ResponseInterface $response): array
    {
        /** @var Response $response */
        return (array) $this->serializer->unserialize($response->getBody());
    }

    /**
     * Get prepared metadata for first video from data array
     *
     * @param array $data
     * @return array
     */
    private function getPreparedMetadata(array $data): array
    {
        $data = $data['items'] ?? [];
        $item = (array) array_pop($data);

        $allowedKeys = $this->metadataKeys;
        $fnCheckKey = fn (string $key): bool => in_array($key, $allowedKeys);

        return array_filter($item, $fnCheckKey, ARRAY_FILTER_USE_KEY);
    }

    /**
     * Get YouTube metadata cache ID by video ID
     *
     * @param string $videoId
     * @return string
     */
    private function getCacheId(string $videoId): string
    {
        return base64_encode(YouTubeMetadata::TYPE_IDENTIFIER . '_video_' . $videoId);
    }
}
