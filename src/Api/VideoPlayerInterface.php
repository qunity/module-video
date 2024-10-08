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
     * Update config of Video Player
     *
     * @param array $data
     * @return $this
     *
     * @throws LocalizedException
     */
    public function updateConfig(array $data): self;
}
