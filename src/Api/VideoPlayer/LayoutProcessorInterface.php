<?php

declare(strict_types=1);

namespace Qunity\Video\Api\VideoPlayer;

use Magento\Framework\DataObject;

interface LayoutProcessorInterface
{
    /**
     * Process js Layout of block
     *
     * @param array $jsLayout
     * @param DataObject $config
     *
     * @return array
     */
    public function process(array $jsLayout, DataObject $config): array;
}
