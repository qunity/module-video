<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Magento\Framework\Stdlib\ArrayManager;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
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
        $linkUrl = $config->getLinkUrl();

        $data = ['config' => ['options' => [
            'id' => $videoId,
            'sources' => [0 => ['src' => $linkUrl]],
        ]]];

        $delimiter = ArrayManager::DEFAULT_PATH_DELIMITER;
        $path = implode($delimiter, ['components', $videoId]);

        $jsLayout = $this->arrayManager->merge($path, $jsLayout, $data);
    }
}
