<?php

/**
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
