<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Qunity\Video\Api\Service\VideoPlayer\GetIdByUrlInterface;

class GetIdByUrl implements GetIdByUrlInterface
{
    /**
     * @inheritDoc
     */
    public function execute(string $url): string
    {
        return self::PREFIX_VIDEO_ID . hash('md2', $url);
    }
}
