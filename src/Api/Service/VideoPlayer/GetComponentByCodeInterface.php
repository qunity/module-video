<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Service\VideoPlayer;

use Magento\Framework\Exception\NoSuchEntityException;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

interface GetComponentByCodeInterface
{
    /**
     * Get JS component for Video Player by code
     *
     * @param string $code
     * @return ComponentInterface
     *
     * @throws NoSuchEntityException
     */
    public function execute(string $code): ComponentInterface;
}
