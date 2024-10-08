<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;

class RequiredConfig extends AbstractProcessor implements LayoutProcessorInterface
{
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

        $path = implode(self::PATH_DELIMITER, ['components', $videoId]);
        $jsLayout = $this->arrayManager->merge($path, $jsLayout, $data);
    }
}
