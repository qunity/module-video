define([
  'video/m2Component',
  'video/vjsErrorInfo'
], function (m2Component, vjsErrorInfo) {
  'use strict';

  /**
   * Error info UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsErrorInfo,
      template: 'Qunity_Video/video/component/error-info',
      imports: {
        message: '${ $.name }:options.message',
        description: '${ $.name }:options.description'
      }
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['display', 'message', 'description']);

      return this;
    },

    /**
     * Show element with error information
     * @public
     *
     * @param {String|null} message
     * @param {String|null} description
     */
    show: function (message = null, description = null) {
      this.message(message ?? this.options.message);
      this.description(description ?? this.options.description);

      this.display(true);
    }
  });
});
