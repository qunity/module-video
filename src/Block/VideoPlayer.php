<?php

declare(strict_types=1);

namespace Qunity\Video\Block;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Message\ManagerInterface as MessageManagerInterface;
use Magento\Framework\Serialize\SerializerInterface;
use Magento\Framework\View\Element\Template;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;
use Qunity\Video\Api\VideoPlayerInterface;

class VideoPlayer extends Template
{
    /**
     * @param Template\Context $context
     * @param SerializerInterface $serializer
     * @param VideoPlayerInterface $videoPlayer
     * @param MessageManagerInterface $messageManager
     * @param LayoutProcessorInterface[] $layoutProcessors
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        private readonly SerializerInterface $serializer,
        private readonly VideoPlayerInterface $videoPlayer,
        private readonly MessageManagerInterface $messageManager,
        private readonly array $layoutProcessors = [],
        array $data = []
    ) {
        parent::__construct($context, $data);
    }

    /**
     * @inheritDoc
     */
    public function getJsLayout(): string
    {
        $config = $this->getConfig();
        foreach ($this->layoutProcessors as $processor) {
            $processor->process($this->jsLayout, $config);
        }

        return $this->serializer->serialize($this->jsLayout);
    }

    /**
     * Update Video Player configuration
     *
     * @param array $config
     * @return $this
     */
    public function update(array $config): self
    {
        try {
            $this->videoPlayer->updateConfig($config);
            $this->updateJsLayout($this->getVideoId());
        } catch (LocalizedException $e) {
            $this->messageManager->addErrorMessage($e->getMessage());
        }

        return $this;
    }

    /**
     * Get Video ID from Video Player config
     *
     * @return string
     */
    public function getVideoId(): string
    {
        return (string) $this->videoPlayer->getConfig()->getVideoId();
    }

    /**
     * Update js Layout data to match current video ID
     *
     * @param string $videoId
     * @return void
     */
    private function updateJsLayout(string $videoId): void
    {
        $components = &$this->jsLayout['components'];

        $components[$videoId] = array_shift($components);
        $components[$videoId]['displayArea'] = $videoId;
    }

    /**
     * Get config for Video Player
     *
     * @return ConfigInterface
     */
    private function getConfig(): ConfigInterface
    {
        return $this->videoPlayer->getConfig();
    }
}
