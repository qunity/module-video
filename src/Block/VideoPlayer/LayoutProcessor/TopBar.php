<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;

class TopBar extends AbstractProcessor implements LayoutProcessorInterface
{
    /**
     * @inheritDoc
     */
    public function process(array &$jsLayout, ConfigInterface $config): void
    {
        $title = $config->getTitle();
        $description = $config->getDescription();

        $data = ['config' => ['options' => [
            'topBar' => [
                'title' => $title,
                'description' => $description,
            ],
        ]]];

        $path = implode(self::PATH_DELIMITER, ['components', $config->getVideoId()]);
        $jsLayout = $this->arrayManager->merge($path, $jsLayout, $data);
    }
}
