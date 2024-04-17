<?php

declare(strict_types=1);

namespace Qunity\Video\Api\VideoPlayer\Data;

interface ConfigInterface
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
}
