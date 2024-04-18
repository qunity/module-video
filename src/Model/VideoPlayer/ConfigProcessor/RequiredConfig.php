<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\ConfigProcessor;

use Magento\Framework\Exception\LocalizedException;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;

class RequiredConfig implements ConfigProcessorInterface
{
    /**
     * @inheritDoc
     */
    public function process(ConfigInterface $config, array $data): void
    {
        $videoSrc = $data[ConfigInterface::VIDEO_SRC] ?? null;
        if (empty($videoSrc)) {
            throw new LocalizedException(__('Video link is required parameter for Video Player.'));
        }

        $config->setVideoId(hash('md2', $videoSrc))
            ->setVideoSrc($videoSrc);
    }
}
