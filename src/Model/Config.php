<?php

declare(strict_types=1);

namespace Qunity\Video\Model;

use Magento\Framework\App\Config\ScopeConfigInterface;

class Config
{
    private const XML_PATH_YOUTUBE_VIDEO_API_KEY = 'youtube_video/general/api_key';

    /**
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig
    ) {
        // ...
    }

    /**
     * Get Google API key for YouTube
     *
     * @return string
     */
    public function getYoutubeVideoApikey(): string
    {
        return (string) $this->scopeConfig->getValue(self::XML_PATH_YOUTUBE_VIDEO_API_KEY);
    }
}
