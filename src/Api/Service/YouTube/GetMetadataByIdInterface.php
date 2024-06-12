<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Service\YouTube;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;

interface GetMetadataByIdInterface
{
    public const KEY_ID = 'id';
    public const KEY_SNIPPET = 'snippet';

    /**
     * Get metadata for YouTube video by video ID
     *
     * @param string $videoId
     * @return array
     *
     * @throws LocalizedException|NoSuchEntityException
     */
    public function execute(string $videoId): array;
}
