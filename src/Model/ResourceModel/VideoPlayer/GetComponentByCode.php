<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Magento\Framework\Exception\NoSuchEntityException;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

class GetComponentByCode
{
    /**
     * @param GetComponentList $getComponentList
     */
    public function __construct(
        private readonly GetComponentList $getComponentList
    ) {
        // ...
    }

    /**
     * Get JS Components for Video Player by code
     *
     * @param string $code
     *
     * @return ComponentInterface
     * @throws NoSuchEntityException
     */
    public function execute(string $code): ComponentInterface
    {
        $components = $this->getComponentList->execute();

        if (!isset($components[$code])) {
            throw new NoSuchEntityException(
                __("JS Component that was requested doesn't exist.")
            );
        }

        return $components[$code];
    }
}
