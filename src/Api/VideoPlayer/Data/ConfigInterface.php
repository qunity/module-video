<?php

/**
 * @noinspection PhpUnnecessaryFullyQualifiedNameInspection
 */

declare(strict_types=1);

namespace Qunity\Video\Api\VideoPlayer\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface ConfigInterface extends ExtensibleDataInterface
{
    public const VIDEO_ID = 'video_id';
    public const VIDEO_SRC = 'video_src';

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
     * Get video SRC
     *
     * @return string|null
     */
    public function getVideoSrc(): ?string;

    /**
     * Set video SRC
     *
     * @param string $videoSrc
     * @return $this
     */
    public function setVideoSrc(string $videoSrc): self;

    /**
     * Retrieve existing extension attributes object or create a new one
     *
     * @return \Qunity\Video\Api\VideoPlayer\Data\ConfigExtensionInterface
     */
    public function getExtensionAttributes(): ConfigExtensionInterface;

    /**
     * Set an extension attributes object
     *
     * @param \Qunity\Video\Api\VideoPlayer\Data\ConfigExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(ConfigExtensionInterface $extensionAttributes): self;
}
