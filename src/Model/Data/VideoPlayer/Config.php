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
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterfaceFactory;
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
     * @param ThumbnailInterfaceFactory $thumbnailFactory
     * @param ExtensionAttributesFactory $extensionAttributesFactory
     * @param array $data
     */
    public function __construct(
        private readonly ComponentInterfaceFactory $componentFactory,
        private readonly ThumbnailInterfaceFactory $thumbnailFactory,
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
    public function getTitle(): ?string
    {
        return $this->hasData(self::TITLE)
            ? (string) $this->getData(self::TITLE) : null;
    }

    /**
     * @inheritDoc
     */
    public function setTitle(string $title): ConfigInterface
    {
        return $this->setData(self::TITLE, $title);
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): ?string
    {
        return $this->hasData(self::DESCRIPTION)
            ? (string) $this->getData(self::DESCRIPTION) : null;
    }

    /**
     * @inheritDoc
     */
    public function setDescription(string $description): ConfigInterface
    {
        return $this->setData(self::DESCRIPTION, $description);
    }

    /**
     * @inheritDoc
     */
    public function getThumbnails(): array
    {
        if (!$this->hasData(self::THUMBNAILS)) {
            $this->populateThumbnails();
        }

        return $this->getData(self::THUMBNAILS);
    }

    /**
     * @inheritDoc
     */
    public function setThumbnails(array $thumbnails): ConfigInterface
    {
        return $this->_setThumbnails($thumbnails);
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
     * Instantiate thumbnails array and populate it with the provided data
     *
     * @param array $data
     * @return void
     */
    private function populateThumbnails(array $data = []): void
    {
        $thumbnails = [];
        foreach ($data as $code => $item) {
            $thumbnails[$code] = $this->thumbnailFactory->create(['data' => $item]);
        }

        $this->_setThumbnails($thumbnails);
    }

    /**
     * Set an thumbnails array
     *
     * @param array $thumbnails
     * @return $this
     */
    private function _setThumbnails(array $thumbnails): ConfigInterface
    {
        $thumbnails = array_filter($thumbnails, fn ($item) => $item instanceof ThumbnailInterface);

        return $this->setData(self::THUMBNAILS, $thumbnails);
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
