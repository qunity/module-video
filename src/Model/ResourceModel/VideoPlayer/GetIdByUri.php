<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

class GetIdByUri
{
    private const PREFIX_VIDEO_ID = 'video-';

    /**
     * Get video ID for Video Player by URI
     *
     * @param string $uri
     * @return string
     */
    public function execute(string $uri): string
    {
        return self::PREFIX_VIDEO_ID . hash('md2', $uri);
    }
}
