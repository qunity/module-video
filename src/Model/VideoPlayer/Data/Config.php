<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\Data;

use Magento\Framework\Api\ExtensionAttributesFactory;
use Magento\Framework\Api\ExtensionAttributesInterface;
use Magento\Framework\DataObject;
use Qunity\Video\Api\VideoPlayer\Data\ConfigExtensionInterface;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;

/**
 * @SuppressWarnings(PHPMD.LongVariable)
 */
class Config extends DataObject implements ConfigInterface
{
    /**
     * @param ExtensionAttributesFactory $extensionAttributesFactory
     * @param array $data
     */
    public function __construct(
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
            ? (string)$this->getData(self::VIDEO_ID) : null;
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
    public function getVideoSrc(): ?string
    {
        return $this->hasData(self::VIDEO_SRC)
            ? (string)$this->getData(self::VIDEO_SRC) : null;
    }

    /**
     * @inheritDoc
     */
    public function setVideoSrc(string $videoSrc): ConfigInterface
    {
        return $this->setData(self::VIDEO_SRC, $videoSrc);
    }

    /**
     * @inheritDoc
     */
    public function getExtensionAttributes(): ConfigExtensionInterface
    {
        if (!$this->getData(self::EXTENSION_ATTRIBUTES_KEY)) {
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
     * Instantiate extension attributes object and populate it with the provided data
     *
     * @param array $extensionAttributesData
     * @return void
     *
     * @noinspection PhpSameParameterValueInspection
     */
    private function populateExtensionAttributes(array $extensionAttributesData = []): void
    {
        $extensionAttributes = $this->extensionAttributesFactory->create(get_class($this), $extensionAttributesData);
        $this->_setExtensionAttributes($extensionAttributes);
    }

    /**
     * Set an extension attributes object
     *
     * @param ExtensionAttributesInterface $extensionAttributes
     * @return $this
     *
     * @SuppressWarnings(PHPMD.CamelCaseMethodName)
     */
    private function _setExtensionAttributes(ExtensionAttributesInterface $extensionAttributes): ConfigInterface
    {
        return $this->setData(self::EXTENSION_ATTRIBUTES_KEY, $extensionAttributes);
    }
}
