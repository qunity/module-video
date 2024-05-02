define([
  'video/m2Component',
  'video/vjsErrorInfo',
  'mage/translate'
], function (m2Component, vjsErrorInfo, $t) {
  'use strict';

  /**
   * ErrorInfo UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsErrorInfo,
      template: 'Qunity_Video/video/component/error-info',
      imports: {
        message: '${ $.name }:options.message',
        description: '${ $.name }:options.description'
      },
      observable: ['message', 'description'],
      message: $t('Playback error.'),
      description: $t('Please try again later or contact your administrator.')
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['message', 'description']);

      return this;
    }
  });
});
