<?php

declare(strict_types=1);

namespace Qunity\Video\Block\VideoPlayer\LayoutProcessor;

use Qunity\Video\Api\Data\VideoPlayer\Config\ThumbnailInterface;
use Qunity\Video\Api\Data\VideoPlayer\ConfigInterface;
use Qunity\Video\Api\VideoPlayer\LayoutProcessorInterface;

class PosterImage extends AbstractProcessor implements LayoutProcessorInterface
{
    /**
     * @inheritDoc
     */
    public function process(array &$jsLayout, ConfigInterface $config): void
    {
        $thumbnails = $config->getThumbnails();
        if (empty($thumbnails)) {
            return;
        }

        $data = ['config' => ['options' => [
            'posterImage' => [
                'sizes' => $this->getImageSizes($thumbnails),
                'srcset' => $this->getImageSrcset($thumbnails),
            ],
        ]]];

        $path = implode(self::PATH_DELIMITER, ['components', $config->getVideoId()]);
        $jsLayout = $this->arrayManager->merge($path, $jsLayout, $data);
    }

    /**
     * Get string for image HTML tag "sizes" attribute value
     *
     * @param ThumbnailInterface[] $thumbnails
     * @return string
     */
    private function getImageSizes(array $thumbnails): string
    {
        $result = [];
        foreach ($thumbnails as $thumbnail) {
            $width = $thumbnail->getWidth();
            $result[] = "(min-width: {$width}px) {$width}w";
        }

        return implode(',', $result);
    }

    /**
     * Get string for image HTML tag "srcset" attribute value
     *
     * @param ThumbnailInterface[] $thumbnails
     * @return string
     */
    private function getImageSrcset(array $thumbnails): string
    {
        $result = [];
        foreach ($thumbnails as $thumbnail) {
            $result[] = "{$thumbnail->getUrl()} {$thumbnail->getWidth()}w";
        }

        return implode(',', $result);
    }
}
