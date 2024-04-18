<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\ConfigProcessor;

use Magento\Framework\Exception\LocalizedException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;

class RequiredConfig implements ConfigProcessorInterface
{
    /**
     * @param LoggerInterface $logger
     */
    public function __construct(
        private readonly LoggerInterface $logger
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function process(ConfigInterface $config, array $data): void
    {
        $videoSrc = $data[ConfigInterface::VIDEO_SRC] ?? null;
        if (empty($videoSrc)) {
            $exceptionMessage = 'Video link is required parameter for Video Player.';
            $this->logger->critical($exceptionMessage, $data);

            throw new LocalizedException(__($exceptionMessage));
        }

        $config->setVideoId(hash('md2', $videoSrc))
            ->setVideoSrc($videoSrc);
    }
}
