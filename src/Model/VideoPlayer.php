<?php

declare(strict_types=1);

namespace Qunity\Video\Model;

use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterfaceFactory;
use Qunity\Video\Api\VideoPlayerInterface;

class VideoPlayer implements VideoPlayerInterface
{
    /**
     * Current configuration of Video Player
     * @var ConfigInterface
     */
    private ConfigInterface $config;

    /**
     * @param ConfigInterfaceFactory $configFactory
     * @param ConfigProcessorInterface[] $configProcessors
     */
    public function __construct(
        private readonly ConfigInterfaceFactory $configFactory,
        private readonly array $configProcessors = []
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function getConfig(): ConfigInterface
    {
        return $this->config;
    }

    /**
     * @inheritDoc
     */
    public function updateConfig(array $config): ConfigInterface
    {
        $this->config = $this->configFactory->create();
        foreach ($this->configProcessors as $processor) {
            $processor->process($this->config, $config);
        }

        return $this->config;
    }
}
