<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Magento\Framework\Stdlib\ArrayManager;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;

class RequiredConfig implements LayoutProcessorInterface
{
    /**
     * @param ArrayManager $arrayManager
     */
    public function __construct(
        private readonly ArrayManager $arrayManager
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function process(array &$jsLayout, ConfigInterface $config): void
    {
        $videoId = $config->getVideoId();
        $videoSrc = $config->getVideoSrc();

        $delimiter = ArrayManager::DEFAULT_PATH_DELIMITER;
        $path = implode($delimiter, ['components', $videoId, 'config']);

        $jsLayout = $this->arrayManager->merge($path, $jsLayout, [
            'videoId' => $videoId,
            'videoSrc' => $videoSrc,
        ]);
    }
}
