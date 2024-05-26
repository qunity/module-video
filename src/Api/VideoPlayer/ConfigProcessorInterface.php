<?php

declare(strict_types=1);

namespace Qunity\Video\Api\VideoPlayer;

use Magento\Framework\Exception\LocalizedException;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;

interface ConfigProcessorInterface
{
    /**
     * Process configuration of Video Player
     *
     * @param ConfigInterface $config
     * @return void
     *
     * @throws LocalizedException
     */
    public function process(ConfigInterface $config): void;
}
