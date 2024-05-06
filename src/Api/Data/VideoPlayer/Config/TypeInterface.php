<?php

declare(strict_types=1);

namespace Qunity\Video\Api\Data\VideoPlayer\Config;

interface TypeInterface
{
    public const CODE = 'code';
    public const COMPONENT = 'component';

    /**
     * Get video Type Code
     *
     * @return string|null
     */
    public function getCode(): ?string;

    /**
     * Set video Type Code
     *
     * @param string $code
     * @return $this
     */
    public function setCode(string $code): self;

    /**
     * Get video JS Component
     *
     * @return string|null
     */
    public function getComponent(): ?string;

    /**
     * Set video JS Component
     *
     * @param string $component
     * @return $this
     */
    public function setComponent(string $component): self;
}
