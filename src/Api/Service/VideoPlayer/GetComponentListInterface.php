<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Service\VideoPlayer;

use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

interface GetComponentListInterface
{
    /**
     * Get all registered JS component list for Video Player
     *
     * @return ComponentInterface[]
     */
    public function execute(): array;
}
