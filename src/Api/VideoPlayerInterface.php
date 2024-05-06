<?php

declare(strict_types=1);

namespace Qunity\Video\Api;

use Magento\Framework\Exception\LocalizedException;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;

interface VideoPlayerInterface
{
    /**
     * Get config for Video Player
     *
     * @return ConfigInterface
     */
    public function getConfig(): ConfigInterface;

    /**
     * Update Video Player config
     *
     * @param array $config
     *
     * @return ConfigInterface
     * @throws LocalizedException
     */
    public function updateConfig(array $config): ConfigInterface;
}
