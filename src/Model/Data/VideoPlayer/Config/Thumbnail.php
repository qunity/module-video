<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Data\VideoPlayer\Config;

use Magento\Framework\DataObject;
use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface;

class Thumbnail extends DataObject implements ThumbnailInterface
{
    /**
     * @inheritDoc
     */
    public function getCode(): ?string
    {
        return $this->hasData(self::CODE)
            ? (string) $this->getData(self::CODE) : null;
    }

    /**
     * @inheritDoc
     */
    public function setCode(string $code): ThumbnailInterface
    {
        return $this->setData(self::CODE, $code);
    }

    /**
     * @inheritDoc
     */
    public function getUrl(): ?string
    {
        return $this->hasData(self::URL)
            ? (string) $this->getData(self::URL) : null;
    }

    /**
     * @inheritDoc
     */
    public function setUrl(string $url): ThumbnailInterface
    {
        return $this->setData(self::URL, $url);
    }

    /**
     * @inheritDoc
     */
    public function getWidth(): ?int
    {
        return $this->hasData(self::WIDTH)
            ? (int) $this->getData(self::WIDTH) : null;
    }

    /**
     * @inheritDoc
     */
    public function setWidth(int $width): ThumbnailInterface
    {
        return $this->setData(self::WIDTH, $width);
    }

    /**
     * @inheritDoc
     */
    public function getHeight(): ?int
    {
        return $this->hasData(self::HEIGHT)
            ? (int) $this->getData(self::HEIGHT) : null;
    }

    /**
     * @inheritDoc
     */
    public function setHeight(int $height): ThumbnailInterface
    {
        return $this->setData(self::HEIGHT, $height);
    }
}
