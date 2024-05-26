<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\ConfigProcessor;

use Laminas\Uri\UriInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterfaceFactory;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;
use Qunity\Video\Model\Service\YouTube\GetMetadataById;
use Qunity\Video\Model\Service\YouTube\GetMetadataByUri;

class YouTubeMetadata implements ConfigProcessorInterface
{
    /**
     * @param UriInterface $zendUri
     * @param GetMetadataByUri $getMetadataByUri
     * @param ThumbnailInterfaceFactory $thumbnailFactory
     */
    public function __construct(
        private readonly UriInterface $zendUri,
        private readonly GetMetadataByUri $getMetadataByUri,
        private readonly ThumbnailInterfaceFactory $thumbnailFactory
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function process(ConfigInterface $config): void
    {
        $data = $this->getYoutubeMetadata($config);
        if (empty($data)) {
            return;
        }

        $snippet = $data[GetMetadataById::KEY_SNIPPET] ?? [];

        $title = $this->getTitle($snippet);
        $description = $this->getDescription($snippet);
        $thumbnails = $this->getThumbnails($snippet);

        $config
            ->setTitle($title)
            ->setDescription($description)
            ->setThumbnails($thumbnails);
    }

    /**
     * Get YouTube video metadata by Video Player configuration
     *
     * @param ConfigInterface $config
     * @return array
     *
     * @throws LocalizedException
     */
    private function getYoutubeMetadata(ConfigInterface $config): array
    {
        $linkUrl = $config->getLinkUrl();
        if (!$this->isYoutubeLink($linkUrl)) {
            return [];
        }

        try {
            $data = $this->getMetadataByUri->execute($linkUrl);
        } catch (NoSuchEntityException) {
            return [];
        }

        return $data ?: [];
    }

    /**
     * Checking whether URI is YouTube link
     *
     * @param string $uri
     * @return bool
     */
    private function isYoutubeLink(string $uri): bool
    {
        $host = $this->zendUri->parse($uri)->getHost();

        return $host == GetMetadataByUri::YOUTUBE_HOST_SHORT ||
            str_ends_with($host, GetMetadataByUri::YOUTUBE_HOST_FULL);
    }

    /**
     * Get video title for Video Player configuration
     *
     * @param array $data
     * @return string
     */
    private function getTitle(array $data): string
    {
        return $data[ConfigInterface::TITLE] ?? '';
    }

    /**
     * Get video description for Video Player configuration
     *
     * @param array $data
     * @return string
     */
    private function getDescription(array $data): string
    {
        return $data[ConfigInterface::DESCRIPTION] ?? '';
    }

    /**
     * Get video thumbnails array for Video Player configuration
     *
     * @param ThumbnailInterface[] $data
     * @return array
     */
    private function getThumbnails(array $data): array
    {
        $thumbnails = $data[ConfigInterface::THUMBNAILS] ?? [];

        foreach ($thumbnails as $code => &$item) {
            $item[ThumbnailInterface::CODE] = $code;
            $item = $this->thumbnailFactory->create(['data' => $item]);
        }

        return $thumbnails;
    }
}
