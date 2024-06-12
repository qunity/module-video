<?php

declare(strict_types=1);

namespace Qunity\Video\Model\ResourceModel\VideoPlayer;

use Laminas\Uri\Uri as ZendUri;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;
use Qunity\Video\Api\Data\VideoPlayer\Config\ComponentInterface;
use Qunity\Video\Api\Service\VideoPlayer\GetComponentByCodeInterface;
use Qunity\Video\Api\Service\VideoPlayer\GetComponentByUrlInterface;

class GetComponentByUrl implements GetComponentByUrlInterface
{
    /**
     * @param LoggerInterface $logger
     * @param ZendUri $zendUri
     * @param ScopeConfigInterface $scopeConfig
     * @param GetComponentByCodeInterface $getComponentByCode
     * @param array $componentMapper
     */
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly ZendUri $zendUri,
        private readonly ScopeConfigInterface $scopeConfig,
        private readonly GetComponentByCodeInterface $getComponentByCode,
        private readonly array $componentMapper = []
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function execute(string $url): ComponentInterface
    {
        $urlHost = $this->getPreparedHost($url);

        foreach ($this->componentMapper as $code => $item) {
            foreach ($item as $itemUrl) {
                if ($this->getPreparedHost($itemUrl) == $urlHost) {
                    return $this->getComponentByCode->execute($code);
                }
            }
        }

        $exceptionMessage = "JS component for requested URL couldn't be determined.";
        $this->logger->critical($exceptionMessage, ['url' => $url]);

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
