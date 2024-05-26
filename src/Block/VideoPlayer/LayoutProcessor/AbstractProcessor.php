<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Magento\Framework\Stdlib\ArrayManager;

abstract class AbstractProcessor
{
    protected const PATH_DELIMITER = ArrayManager::DEFAULT_PATH_DELIMITER;

    /**
     * @param ArrayManager $arrayManager
     */
    public function __construct(
        protected readonly ArrayManager $arrayManager
    ) {
        // ...
    }
}
