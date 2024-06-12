<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterfaceFactory;
use Qunity\Video\Api\Service\VideoPlayer\GetComponentListInterface;

class GetComponentList implements GetComponentListInterface
{
    /**
     * List of PHP objects containing JS components info for Video Player
     * @var ComponentInterface[]
     */
    private array $items;

    /**
     * @param ComponentInterfaceFactory $componentFactory
     * @param array $componentListData
     */
    public function __construct(
        private readonly ComponentInterfaceFactory $componentFactory,
        private readonly array $componentListData = []
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function execute(): array
    {
        if (isset($this->items)) {
            return $this->items;
        }

        foreach ($this->componentListData as $code => $item) {
            $item[ComponentInterface::CODE] = $code;
            $this->items[$code] = $this->componentFactory->create(['data' => $item]);
        }

        return $this->items;
    }
}
