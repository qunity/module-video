<?php

declare(strict_types=1);

namespace Qunity\Video\Model;

use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterfaceFactory;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;
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
        private readonly array $configProcessors
    ) {
        $this->config = $this->configFactory->create();
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
    public function updateConfig(array $data): VideoPlayerInterface
    {
        $this->config = $this->configFactory->create(['data' => $data]);
        foreach ($this->configProcessors as $processor) {
            $processor->process($this->config);
        }

        return $this;
    }
}
