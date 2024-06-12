<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Service\VideoPlayer\GetComponentByCodeInterface;
use Qunity\Video\Api\Service\VideoPlayer\GetComponentListInterface;

class GetComponentByCode implements GetComponentByCodeInterface
{
    /**
     * @param LoggerInterface $logger
     * @param GetComponentListInterface $getComponentList
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly GetComponentListInterface $getComponentList
    ) {
        // ...
    }

    /**
     * @inheritDoc
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
