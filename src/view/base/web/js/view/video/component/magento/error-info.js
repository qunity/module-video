define([
  'video/m2Component',
  'video/vjsComponent',
  'mage/translate'
], function (m2Component, vjsErrorInfo, $t) {
  'use strict';

  /**
   * ErrorInfo UI component for Magento video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsErrorInfo,
      template: 'Qunity_Video/video/component/error-info',
      imports: {
        visible: '${ $.name }:options.visible',
        message: '${ $.name }:options.message',
        description: '${ $.name }:options.description'
      },
      message: $t('Playback error.'),
      description: $t('Please try again later or contact your administrator.')
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['visible', 'message', 'description']);

      return this;
    }
  });
});
