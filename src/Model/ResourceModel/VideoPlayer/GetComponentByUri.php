<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Laminas\Uri\UriInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

class GetComponentByUri
{
    /**
     * @param UriInterface $zendUri
     * @param ScopeConfigInterface $scopeConfig
     * @param GetComponentByCode $getComponentByCode
     * @param array $mapper
     */
    public function __construct(
        private readonly UriInterface $zendUri,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly GetComponentByCode $getComponentByCode,
        private readonly array $mapper = []
    ) {
        // ...
    }

    /**
     * Get JS Components for Video Player by URI
     *
     * @param string $uri
     *
     * @return ComponentInterface
     * @throws NoSuchEntityException
     */
    public function execute(string $uri): ComponentInterface
    {
        $urlHost = $this->getPreparedHost($uri);

        foreach ($this->mapper as $code => $item) {
            foreach ($item as $host) {
                if ($this->getPreparedHost($host) == $urlHost) {
                    return $this->getComponentByCode->execute($code);
                }
            }
        }

        throw new NoSuchEntityException(
            __("JS Component for requested URI could not be determined.")
        );
    }

    /**
     * Get prepared host for further comparison
     *
     * @param string $value
     * @return string
     */
    private function getPreparedHost(string $value): string
    {
        if (!str_starts_with($value, 'http')) {
            $value = (string) $this->scopeConfig->getValue($value);
        }

        return (string) $this->zendUri->parse($value)->getHost();
    }
}
