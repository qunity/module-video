<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterfaceFactory;

class GetComponentList
{
    /**
     * List of PHP objects containing JS components info for Video Player
     * @var ComponentInterface[]
     */
    private array $items;

    /**
     * @param ComponentInterfaceFactory $componentFactory
     * @param array $data
     */
    public function __construct(
        private readonly ComponentInterfaceFactory $componentFactory,
        private readonly array $data = []
    ) {
        // ...
    }

    /**
     * Get all registered JS components for Video Player
     *
     * @return ComponentInterface[]
     */
    public function execute(): array
    {
        if (!empty($this->items)) {
            return $this->items;
        }

        foreach ($this->data as $code => $item) {
            $item[ComponentInterface::CODE] = $code;
            $this->items[$code] = $this->componentFactory->create(['data'=> $item]);
        }

        return $this->items;
    }
}
