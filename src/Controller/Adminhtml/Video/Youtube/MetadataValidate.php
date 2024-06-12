<?php

declare(strict_types=1);

namespace Qunity\Video\Controller\Adminhtml\Video\Youtube;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\Controller\Result\Json as JsonResult;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\DataObjectFactory;
use Magento\Framework\Exception\LocalizedException;
use Qunity\Video\Api\Service\YouTube\GetMetadataByUrlInterface;

class MetadataValidate extends Action implements HttpPostActionInterface
{
    /**
     * @param Context $context
     * @param JsonFactory $jsonResultFactory
     * @param GetMetadataByUrlInterface $getMetadataByUrl
     * @param DataObjectFactory $responseFactory
     */
    public function __construct(
        Context $context,
        private readonly JsonFactory $jsonResultFactory,
        private readonly GetMetadataByUrlInterface $getMetadataByUrl,
        private readonly DataObjectFactory $responseFactory
    ) {
        parent::__construct($context);
    }

    /**
     * @inheritDoc
     */
    public function execute(): JsonResult
    {
        $response = $this->responseFactory->create();
        $jsonResult = $this->jsonResultFactory->create();

        try {
            $videoUrl = $this->getRequest()->getParam('videoUrl');
            $this->getMetadataByUrl->execute($videoUrl);

            $message = __('YouTube video metadata validation completed successfully.');
            $response->setData(['status' => true, 'message' => $message]);
        } catch (LocalizedException $e) {
            $response->setData(['status' => false, 'message' => $e->getMessage()]);
        }

        return $jsonResult->setData($response);
    }
}
