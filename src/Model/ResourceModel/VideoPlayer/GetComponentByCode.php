<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

class GetComponentByCode
{
    /**
     * @param LoggerInterface $logger
     * @param GetComponentList $getComponentList
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly GetComponentList $getComponentList
    ) {
        // ...
    }

    /**
     * Get JS components for Video Player by code
     *
     * @param string $code
     * @return ComponentInterface
     *
     * @throws NoSuchEntityException
     */
    public function execute(string $code): ComponentInterface
    {
        $components = $this->getComponentList->execute();

        if (!isset($components[$code])) {
            $exceptionMessage = "JS component that was requested doesn't exist.";
            $this->logger->critical($exceptionMessage, ['code' => $code]);

            throw new NoSuchEntityException(__($exceptionMessage));
        }

        return $components[$code];
    }
}
