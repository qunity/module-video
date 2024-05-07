<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

class GetIdByUri
{
    /**
     * Get video ID for Video Player by URI
     *
     * @param string $uri
     * @return string
     */
    public function execute(string $uri): string
    {
        return 'video-' . hash('md2', $uri);
    }
}
