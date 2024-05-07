<?php

/**
 * @noinspection PhpSameParameterValueInspection
 */

declare(strict_types=1);

namespace Qunity\Video\Model\Data\VideoPlayer;

use Magento\Framework\Api\ExtensionAttributesFactory;
use Magento\Framework\Api\ExtensionAttributesInterface;
use Magento\Framework\DataObject;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterfaceFactory;
use Qunity\Video\Api\Data\VideoPlayer\ConfigExtensionInterface;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;

/**
 * @SuppressWarnings(PHPMD.LongVariable)
 * @SuppressWarnings(PHPMD.CamelCaseMethodName)
 */
class Config extends DataObject implements ConfigInterface
{
    /**
     * @param ComponentInterfaceFactory $componentFactory
     * @param ExtensionAttributesFactory $extensionAttributesFactory
     * @param array $data
     */
    public function __construct(
        private readonly ComponentInterfaceFactory $componentFactory,
        private readonly ExtensionAttributesFactory $extensionAttributesFactory,
        array $data = []
    ) {
        parent::__construct($data);
    }

    /**
     * @inheritDoc
     */
    public function getVideoId(): ?string
    {
        return $this->hasData(self::VIDEO_ID)
            ? (string) $this->getData(self::VIDEO_ID) : null;
    }

    /**
     * @inheritDoc
     */
    public function setVideoId(string $videoId): ConfigInterface
    {
        return $this->setData(self::VIDEO_ID, $videoId);
    }

    /**
     * @inheritDoc
     */
    public function getLinkUrl(): ?string
    {
        return $this->hasData(self::LINK_URL)
            ? (string) $this->getData(self::LINK_URL) : null;
    }

    /**
     * @inheritDoc
     */
    public function setLinkUrl(string $url): ConfigInterface
    {
        return $this->setData(self::LINK_URL, $url);
    }

    /**
     * @inheritDoc
     */
    public function getComponent(): ComponentInterface
    {
        if (!$this->hasData(self::COMPONENT)) {
            $this->populateComponent();
        }

        return $this->getData(self::COMPONENT);
    }

    /**
     * @inheritDoc
     */
    public function setComponent(ComponentInterface $component): ConfigInterface
    {
        return $this->_setComponent($component);
    }

    /**
     * @inheritDoc
     */
    public function getExtensionAttributes(): ConfigExtensionInterface
    {
        if (!$this->hasData(self::EXTENSION_ATTRIBUTES_KEY)) {
            $this->populateExtensionAttributes();
        }

        return $this->getData(self::EXTENSION_ATTRIBUTES_KEY);
    }

    /**
     * @inheritDoc
     */
    public function setExtensionAttributes(ConfigExtensionInterface $extensionAttributes): ConfigInterface
    {
        return $this->_setExtensionAttributes($extensionAttributes);
    }

    /**
     * Instantiate JS component object and populate it with the provided data
     *
     * @param array $data
     * @return void
     */
    private function populateComponent(array $data = []): void
    {
        $this->_setComponent($this->componentFactory->create(['data' => $data]));
    }

    /**
     * Set an JS component object
     *
     * @param ComponentInterface $component
     * @return $this
     */
    private function _setComponent(ComponentInterface $component): ConfigInterface
    {
        return $this->setData(self::COMPONENT, $component);
    }

    /**
     * Instantiate extension attributes object and populate it with the provided data
     *
     * @param array $data
     * @return void
     */
    private function populateExtensionAttributes(array $data = []): void
    {
        $className = get_class($this);
        $extensionAttributes = $this->extensionAttributesFactory->create($className, $data);
        $this->_setExtensionAttributes($extensionAttributes);
    }

    /**
     * Set an extension attributes object
     *
     * @param ExtensionAttributesInterface $extensionAttributes
     * @return $this
     */
    private function _setExtensionAttributes(ExtensionAttributesInterface $extensionAttributes): ConfigInterface
    {
        return $this->setData(self::EXTENSION_ATTRIBUTES_KEY, $extensionAttributes);
    }
}
