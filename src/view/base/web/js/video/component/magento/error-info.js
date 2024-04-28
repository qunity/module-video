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
      template: 'Qunity_Video/video/component/error-info'
    },

    /**
     * @inheritDoc
     */
    initialize: function () {
      this._super();
      this.initDefaultInfo();

      return this;
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
     * Initializes default error information
     * @public
     *
     * @returns {uiComponent}
     */
    initDefaultInfo: function () {
      this.message(this.options.message);
      this.description(this.options.description);

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
