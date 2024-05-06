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
    public const SRC = 'src';
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
     * Get video SRC
     *
     * @return string|null
     */
    public function getSrc(): ?string;

    /**
     * Set video SRC
     *
     * @param string $src
     * @return $this
     */
    public function setSrc(string $src): self;

    /**
     * Get video JS component
     *
     * @return \Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface
     */
    public function getComponent(): ComponentInterface;

    /**
     * Set video JS component
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
