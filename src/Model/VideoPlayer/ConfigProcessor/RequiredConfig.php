<?php

declare(strict_types=1);

namespace Qunity\Video\Model\VideoPlayer\ConfigProcessor;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\ConfigProcessorInterface;
use Qunity\Video\Model\ResourceModel\VideoPlayer\GetComponentByUri;
use Qunity\Video\Model\ResourceModel\VideoPlayer\GetIdByUri;

class RequiredConfig implements ConfigProcessorInterface
{
    /**
     * @param LoggerInterface $logger
     * @param GetIdByUri $getIdByUri
     * @param GetComponentByUri $getComponentByUri
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly GetIdByUri $getIdByUri,
        private readonly GetComponentByUri $getComponentByUri
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
     * @param string $uri
     * @return string
     */
    private function getVideoId(string $uri): string
    {
        return $this->getIdByUri->execute($uri);
    }

    /**
     * Get JS component for Video Player configuration
     *
     * @param string $uri
     * @return ComponentInterface
     *
     * @throws NoSuchEntityException
     */
    private function getComponent(string $uri): ComponentInterface
    {
        return $this->getComponentByUri->execute($uri);
    }
}
