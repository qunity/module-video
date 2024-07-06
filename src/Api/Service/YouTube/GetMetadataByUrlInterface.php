<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Service\YouTube;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;

interface GetMetadataByUrlInterface
{
    public const YOUTUBE_HOST_FULL = 'youtube.com';
    public const YOUTUBE_HOST_SHORT = 'youtu.be';

    /**
     * Get metadata for YouTube video by video URL
     *
     * @param string $url
     * @return array
     *
     * @throws LocalizedException|NoSuchEntityException
     */
    public function execute(string $url): array;
}
