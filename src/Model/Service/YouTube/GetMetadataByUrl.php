<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Service\YouTube;

use Laminas\Uri\Uri as ZendUri;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Service\YouTube\GetMetadataByIdInterface;
use Qunity\Video\Api\Service\YouTube\GetMetadataByUrlInterface;

class GetMetadataByUrl implements GetMetadataByUrlInterface
{
    /**
     * @param LoggerInterface $logger
     * @param ZendUri $zendUri
     * @param GetMetadataByIdInterface $getMetadataById
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly ZendUri $zendUri,
        private readonly GetMetadataByIdInterface $getMetadataById
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function execute(string $url): array
    {
        $videoId = $this->getVideoId($url);

        if (empty($videoId)) {
            $exceptionMessage = "YouTube video metadata for requested URL couldn't be determined.";
            $this->logger->critical($exceptionMessage, ['url' => $url]);

            throw new NoSuchEntityException(__($exceptionMessage));
        }

        return $this->getMetadataById->execute($videoId);
    }

    /**
     * Get YouTube video ID from URL
     *
     * @param string $url
     * @return string
     */
    private function getVideoId(string $url): string
    {
        $parsedUrl = $this->zendUri->parse($url);
        $host = $parsedUrl->getHost();

        if ($host == self::YOUTUBE_HOST_SHORT) {
            $path = trim($parsedUrl->getPath(), '/');

            return array_first(explode('/', $path));
        }

        if (str_ends_with($host, self::YOUTUBE_HOST_FULL)) {
            $query = $parsedUrl->getQueryAsArray();

            return $query['v'] ?? '';
        }

        return '';
    }
}
