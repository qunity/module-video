<?php

declare(strict_types=1);

namespace Qunity\Video\Api\VideoPlayer;

use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;

interface LayoutProcessorInterface
{
    /**
     * Process JS layout of Video Player block
     *
     * @param array $jsLayout
     * @param ConfigInterface $config
     *
     * @return void
     */
    public function process(array &$jsLayout, ConfigInterface $config): void;
}
