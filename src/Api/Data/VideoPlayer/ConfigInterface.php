<?php

/**
 * @noinspection PhpFullyQualifiedNameUsageInspection
 * @noinspection PhpUnnecessaryFullyQualifiedNameInspection
 */

declare(strict_types=1);

namespace Qunity\Video\Api\Data\VideoPlayer;

use Magento\Framework\Api\ExtensibleDataInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

interface ConfigInterface extends ExtensibleDataInterface
{
    public const VIDEO_ID = 'video_id';
    public const LINK_URL = 'link_url';
    public const COMPONENT = 'component';
    public const TITLE = 'title';
    public const DESCRIPTION = 'description';
    public const THUMBNAILS = 'thumbnails';

    /**
     * Get video ID
     *
     * @return string|null
     */
    public function getVideoId(): ?string;

    /**
     * Set video ID
     *
     * @param string $videoId
     * @return $this
     */
    public function setVideoId(string $videoId): self;

    /**
     * Get video link URL
     *
     * @return string|null
     */
    public function getLinkUrl(): ?string;

    /**
     * Set video link URL
     *
     * @param string $url
     * @return $this
     */
    public function setLinkUrl(string $url): self;

    /**
     * Retrieve video JS component object or create a new one
     *
     * @return \Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface
     */
    public function getComponent(): ComponentInterface;

    /**
     * Set an video JS component object
     *
     * @param \Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface $component
     * @return $this
     */
    public function setComponent(ComponentInterface $component): self;

    /**
     * Get video title
     *
     * @return string|null
     */
    public function getTitle(): ?string;

    /**
     * Set video title
     *
     * @param string $title
     * @return $this
     */
    public function setTitle(string $title): self;

    /**
     * Get video description
     *
     * @return string|null
     */
    public function getDescription(): ?string;

    /**
     * Set video description
     *
     * @param string $description
     * @return $this
     */
    public function setDescription(string $description): self;

    /**
     * Retrieve video thumbnails array or create a new one
     *
     * @return \Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface[]
     */
    public function getThumbnails(): array;

    /**
     * Set a video thumbnails array
     *
     * @param \Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface[] $thumbnails
     * @return $this
     */
    public function setThumbnails(array $thumbnails): self;

    /**
     * Retrieve existing extension attributes object or create a new one
     *
     * @return \Qunity\Video\Api\Data\VideoPlayer\ConfigExtensionInterface
     */
    public function getExtensionAttributes(): ConfigExtensionInterface;

    /**
     * Set an extension attributes object
     *
     * @param \Qunity\Video\Api\Data\VideoPlayer\ConfigExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(ConfigExtensionInterface $extensionAttributes): self;
}
