<?php

declare(strict_types=1);

namespace Qunity\Video\Block;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Message\ManagerInterface as MessageManagerInterface;
use Magento\Framework\Serialize\SerializerInterface;
use Magento\Framework\View\Element\Template;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;
use Qunity\Video\Api\VideoPlayerInterface;

class VideoPlayer extends Template
{
    /**
     * @param SerializerInterface $serializer
     * @param VideoPlayerInterface $videoPlayer
     * @param MessageManagerInterface $messageManager
     * @param LayoutProcessorInterface[] $layoutProcessors
     * @param Template\Context $context
     * @param array $data
     */
    public function __construct(
        private readonly SerializerInterface $serializer,
        private readonly VideoPlayerInterface $videoPlayer,
        private readonly MessageManagerInterface $messageManager,
        private readonly array $layoutProcessors,
        Template\Context $context,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }

    /**
     * @inheritDoc
     */
    public function getJsLayout(): string
    {
        $jsLayout = $this->jsLayout;
        $config = $this->getConfig();

        foreach ($this->layoutProcessors as $processor) {
            $processor->process($jsLayout, $config);
        }

        return $this->serializer->serialize($jsLayout);
    }

    /**
     * Update Video Player configuration
     *
     * @param array $data
     * @return $this
     */
    public function update(array $data): self
    {
        try {
            $this->videoPlayer->updateConfig($data);
            $this->updateJsLayout($this->getConfig());
        } catch (LocalizedException $e) {
            $this->messageManager->addErrorMessage($e->getMessage());
        }

        return $this;
    }

    /**
     * Get video ID from Video Player configuration
     *
     * @return string
     */
    public function getVideoId(): string
    {
        return (string) $this->getConfig()->getVideoId();
    }

    /**
     * Update JS layout data to match current video ID
     *
     * @param ConfigInterface $config
     * @return void
     */
    private function updateJsLayout(ConfigInterface $config): void
    {
        $components = &$this->jsLayout['components'];

        $videoId = $config->getVideoId();
        $componentPath = $config->getComponent()->getPath();

        $components[$videoId] = array_shift($components);
        $components[$videoId]['displayArea'] = $videoId;
        $components[$videoId]['component'] = $componentPath;
    }

    /**
     * Get configuration for Video Player
     *
     * @return ConfigInterface
     */
    private function getConfig(): ConfigInterface
    {
        return $this->videoPlayer->getConfig();
    }
}
