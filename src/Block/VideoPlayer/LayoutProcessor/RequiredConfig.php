<?php

/**
 * @noinspection PhpPossiblePolymorphicInvocationInspection
 */

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Magento\Framework\DataObject;
use Magento\Framework\Stdlib\ArrayManager;
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
    public function process(array $jsLayout, DataObject $config): array
    {
        $videoId = $config->getVideoId(); // @phpstan-ignore-line
        $videoSrc = $config->getVideoSrc(); // @phpstan-ignore-line

        $delimiter = ArrayManager::DEFAULT_PATH_DELIMITER;
        $path = implode($delimiter, ['components', $videoId, 'config']);

        return $this->arrayManager->merge($path, $jsLayout, [
            'videoId' => $videoId,
            'videoSrc' => $videoSrc,
        ]);
    }
}
