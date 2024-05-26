<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Data\VideoPlayer\Config;

interface ThumbnailInterface
{
    public const CODE = 'code';
    public const URL = 'url';
    public const WIDTH = 'width';
    public const HEIGHT = 'height';

    /**
     * Get video thumbnail code
     *
     * @return string|null
     */
    public function getCode(): ?string;

    /**
     * Set video thumbnail code
     *
     * @param string $code
     * @return $this
     */
    public function setCode(string $code): self;

    /**
     * Get video thumbnail URL
     *
     * @return string|null
     */
    public function getUrl(): ?string;

    /**
     * Set video thumbnail URL
     *
     * @param string $url
     * @return $this
     */
    public function setUrl(string $url): self;

    /**
     * Get video thumbnail width
     *
     * @return int|null
     */
    public function getWidth(): ?int;

    /**
     * Set video thumbnail width
     *
     * @param int $width
     * @return $this
     */
    public function setWidth(int $width): self;

    /**
     * Get video thumbnail height
     *
     * @return int|null
     */
    public function getHeight(): ?int;

    /**
     * Set video thumbnail height
     *
     * @param int $height
     * @return $this
     */
    public function setHeight(int $height): self;
}
