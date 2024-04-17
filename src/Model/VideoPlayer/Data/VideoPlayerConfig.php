<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Data;

use Magento\Framework\DataObject;
use Qunity\Video\Api\VideoPlayer\Data\ConfigInterface;

class VideoPlayerConfig extends DataObject implements ConfigInterface
{
    /**
     * @inheritDoc
     */
    public function getVideoId(): ?string
    {
        return $this->hasData(self::VIDEO_ID)
            ? (string)$this->getData(self::VIDEO_ID) : null;
    }

    /**
     * @inheritDoc
     */
    public function setVideoId(string $videoId): static
    {
        return $this->setData(self::VIDEO_ID, $videoId);
    }

    /**
     * @inheritDoc
     */
    public function getVideoSrc(): ?string
    {
        return $this->hasData(self::VIDEO_SRC)
            ? (string)$this->getData(self::VIDEO_SRC) : null;
    }

    /**
     * @inheritDoc
     */
    public function setVideoSrc(string $videoSrc): static
    {
        return $this->setData(self::VIDEO_SRC, $videoSrc);
    }
}
