<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Service\YouTube;

use Laminas\Uri\UriInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;

class GetMetadataByUri
{
    public const YOUTUBE_HOST_FULL = 'youtube.com';
    public const YOUTUBE_HOST_SHORT = 'youtu.be';

    /**
     * @param LoggerInterface $logger
     * @param UriInterface $zendUri
     * @param GetMetadataById $getMetadataById
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly UriInterface $zendUri,
        private readonly GetMetadataById $getMetadataById
    ) {
        // ...
    }

    /**
     * Get metadata for YouTube video by video URI
     *
     * @param string $uri
     * @return array
     *
     * @throws LocalizedException
     */
    public function execute(string $uri): array
    {
        $videoId = $this->getVideoId($uri);

        if (empty($videoId)) {
            $exceptionMessage = "Video metadata for requested URI couldn't be determined.";
            $this->logger->critical($exceptionMessage, ['uri' => $uri]);

            throw new NoSuchEntityException(__($exceptionMessage));
        }

        return $this->getMetadataById->execute($videoId);
    }

    /**
     * Get YouTube video ID from URI
     *
     * @param string $uri
     * @return string
     */
    private function getVideoId(string $uri): string
    {
        $url = $this->zendUri->parse($uri);
        $host = $url->getHost();

        if ($host == self::YOUTUBE_HOST_SHORT) {
            $path = trim($url->getPath(), '/');

            return array_first(explode('/', $path));
        }

        if (str_ends_with($host, self::YOUTUBE_HOST_FULL)) {
            $query = $url->getQueryAsArray();

            return $query['v'] ?? '';
        }

        return '';
    }
}
