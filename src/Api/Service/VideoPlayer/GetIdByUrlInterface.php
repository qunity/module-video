<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Service\VideoPlayer;

interface GetIdByUrlInterface
{
    public const PREFIX_VIDEO_ID = 'video-';

    /**
     * Get video ID for Video Player by URL
     *
     * @param string $url
     * @return string
     */
    public function execute(string $url): string;
}
