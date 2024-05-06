<?php

declare(strict_types=1);

namespace Qunity\Video\Model\Data\Source\VideoPlayer\Config\Type;

use Magento\Framework\Data\OptionSourceInterface;

class Component implements OptionSourceInterface
{
    /**
     * @var array
     */
    private array $options;

    /**
     * @param array $data
     */
    public function __construct(
        private readonly array $data = []
    ) {
        // ...
    }

    /**
     * @inheritDoc
     */
    public function toOptionArray(): array
    {
        if (isset($this->options)) {
            return $this->options;
        }

        foreach ($this->data as $code => $item) {
            $this->options[] = [
                'code' => $code,
                'value' => $item['value'],
                'label' => __($item['label']),
            ];
        }

        return $this->options;
    }
}
