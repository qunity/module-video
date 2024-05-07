<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Laminas\Uri\UriInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;

class GetComponentByUri
{
    /**
     * @param LoggerInterface $logger
     * @param UriInterface $zendUri
     * @param ScopeConfigInterface $scopeConfig
     * @param GetComponentByCode $getComponentByCode
     * @param array $componentMapper
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly UriInterface $zendUri,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly GetComponentByCode $getComponentByCode,
        private readonly array $componentMapper = []
    ) {
        // ...
    }

    /**
     * Get JS components for Video Player by URI
     *
     * @param string $uri
     *
     * @return ComponentInterface
     * @throws NoSuchEntityException
     */
    public function execute(string $uri): ComponentInterface
    {
        $urlHost = $this->getPreparedHost($uri);

        foreach ($this->componentMapper as $code => $item) {
            foreach ($item as $host) {
                if ($this->getPreparedHost($host) == $urlHost) {
                    return $this->getComponentByCode->execute($code);
                }
            }
        }

        $exceptionMessage = "JS component for requested URI couldn't be determined.";
        $this->logger->critical($exceptionMessage, ['uri' => $uri]);

        throw new NoSuchEntityException(__($exceptionMessage));
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
