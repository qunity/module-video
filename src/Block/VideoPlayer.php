<?php

/**
 * @noinspection PhpUnnecessaryFullyQualifiedNameInspection
 */

declare(strict_types=1);

namespace Qunity\Video\Block;

use Magento\Framework\DataObject;
use Magento\Framework\DataObjectFactory;
use Magento\Framework\Serialize\SerializerInterface;
use Magento\Framework\View\Element\Template;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;

/**
 * @method \string getVideoId()
 * @method $this setVideoId(string $value)
 * @method \string getVideoSrc()
 * @method $this setVideoSrc(string $value)
 */
class VideoPlayer extends Template
{
    /**
     * @param Template\Context $context
     * @param SerializerInterface $serializer
     * @param DataObjectFactory $dataObjectFactory
     * @param LayoutProcessorInterface[] $layoutProcessors
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        private readonly SerializerInterface $serializer,
        private readonly DataObjectFactory $dataObjectFactory,
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
            $this->jsLayout = $processor->process($this->jsLayout, $config);
        }

        return $this->serializer->serialize($this->jsLayout);
    }

    /**
     * Generate new video ID value
     *
     * @return static
     */
    public function generateVideoId(): static
    {
        static $counter = 0;

        $videoId = hash('md2', (string) ($counter++));
        $this->setVideoId($videoId)->updateJsLayout();

        return $this;
    }

    /**
     * Update js Layout data to match current video ID
     *
     * @return void
     */
    public function updateJsLayout(): void
    {
        $videoId = $this->getVideoId();
        $components = &$this->jsLayout['components'];

        $components[$videoId] = array_shift($components);
        $components[$videoId]['displayArea'] = $videoId; // @phpstan-ignore-line
    }

    /**
     * Get config data for video component
     *
     * @return DataObject
     */
    private function getConfig(): DataObject
    {
        $config = $this->dataObjectFactory->create(['data' => $this->getData()]);
        $config->unsetData(['type', 'jsLayout', 'module_name']);

        return $config;
    }
}
