<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\ConfigProcessor;

use Laminas\Uri\Uri as ZendUri;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterfaceFactory;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\Service\YouTube\GetMetadataByIdInterface;
use Qunity\Video\Api\Service\YouTube\GetMetadataByUrlInterface;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;

class YouTubeMetadata implements ConfigProcessorInterface
{
    /**
     * @param ZendUri $zendUri
     * @param GetMetadataByUrlInterface $getMetadataByUrl
     * @param ThumbnailInterfaceFactory $thumbnailFactory
     */
    public function __construct(
        private readonly ZendUri $zendUri,
        private readonly GetMetadataByUrlInterface $getMetadataByUrl,
        private readonly ThumbnailInterfaceFactory $thumbnailFactory
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function process(ConfigInterface $config): void
    {
        try {
            $data = $this->getYoutubeMetadata($config);
        } catch (LocalizedException) {
            return; // YouTube video metadata isn't required to display video.
        }

        if (empty($data)) {
            return;
        }

        $snippet = $data[GetMetadataByIdInterface::KEY_SNIPPET] ?? [];

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
            $data = $this->getMetadataByUrl->execute($linkUrl);
        } catch (NoSuchEntityException) {
            return [];
        }

        return $data ?: [];
    }

    /**
     * Checking whether URL is YouTube link
     *
     * @param string $url
     * @return bool
     */
    private function isYoutubeLink(string $url): bool
    {
        $host = $this->zendUri->parse($url)->getHost();

        return $host == GetMetadataByUrlInterface::YOUTUBE_HOST_SHORT ||
            str_ends_with($host, GetMetadataByUrlInterface::YOUTUBE_HOST_FULL);
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
