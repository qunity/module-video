<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Data\VideoPlayer\Config;

interface ComponentInterface
{
    public const CODE = 'code';
    public const PATH = 'path';

    /**
     * Get video JS Component code
     *
     * @return string|null
     */
    public function getCode(): ?string;

    /**
     * Set video JS Component code
     *
     * @param string $code
     * @return $this
     */
    public function setCode(string $code): self;

    /**
     * Get video JS Component path/alias
     *
     * @return string|null
     */
    public function getPath(): ?string;

    /**
     * Set video JS Component path/alias
     *
     * @param string $path
     * @return $this
     */
    public function setPath(string $path): self;
}
