<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Data\VideoPlayer\Config;

use Magento\Framework\DataObject;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

class Component extends DataObject implements ComponentInterface
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
    public function setCode(string $code): ComponentInterface
    {
        return $this->setData(self::CODE, $code);
    }

    /**
     * @inheritDoc
     */
    public function getPath(): ?string
    {
        return $this->hasData(self::PATH)
            ? (string) $this->getData(self::PATH) : null;
    }

    /**
     * @inheritDoc
     */
    public function setPath(string $path): ComponentInterface
    {
        return $this->setData(self::PATH, $path);
    }
}
