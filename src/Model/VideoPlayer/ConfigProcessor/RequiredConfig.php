<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\ConfigProcessor;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\Service\VideoPlayer\GetComponentByUrlInterface;
use Qunity\Video\Api\Service\VideoPlayer\GetIdByUrlInterface;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;

class RequiredConfig implements ConfigProcessorInterface
{
    /**
     * @param LoggerInterface $logger
     * @param GetIdByUrlInterface $getIdByUrl
     * @param GetComponentByUrlInterface $getComponentByUrl
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly GetIdByUrlInterface $getIdByUrl,
        private readonly GetComponentByUrlInterface $getComponentByUrl
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function process(ConfigInterface $config): void
    {
        $linkUrl = $this->getLinkUrl($config);
        $videoId = $this->getVideoId($linkUrl);
        $component = $this->getComponent($linkUrl);

        $config
            ->setVideoId($videoId)
            ->setLinkUrl($linkUrl)
            ->setComponent($component);
    }

    /**
     * Get link URL for Video Player configuration
     *
     * @param ConfigInterface $config
     * @return string
     *
     * @throws LocalizedException
     */
    private function getLinkUrl(ConfigInterface $config): string
    {
        $linkUrl = $config->getLinkUrl();

        if (empty($linkUrl)) {
            $exceptionMessage = 'Video link is required parameter for Video Player.';
            $this->logger->critical($exceptionMessage);

            throw new LocalizedException(__($exceptionMessage));
        }

        return $linkUrl;
    }

    /**
     * Get video ID for Video Player configuration
     *
     * @param string $url
     * @return string
     */
    private function getVideoId(string $url): string
    {
        return $this->getIdByUrl->execute($url);
    }

    /**
     * Get JS component for Video Player configuration
     *
     * @param string $url
     * @return ComponentInterface
     *
     * @throws NoSuchEntityException
     */
    private function getComponent(string $url): ComponentInterface
    {
        return $this->getComponentByUrl->execute($url);
    }
}
