<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Magento\Framework\Stdlib\ArrayManager;

abstract class AbstractProcessor
{
    /**
     * @param ArrayManager $arrayManager
     */
    public function __construct(
        protected readonly ArrayManager $arrayManager
    ) {
        // ...
    }
}
