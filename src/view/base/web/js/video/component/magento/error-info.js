define([
  'video/m2Component',
  'video/vjsErrorInfo'
], function (m2Component, vjsErrorInfo) {
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
      }
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['info', 'message', 'description']);

      return this;
    },

    /**
     * @inheritDoc
     */
    initSubscriber: function () {
      this._super();
      this.info.subscribe(this._setInfo.bind(this));

      return this;
    },

    /**
     * Set error information
     * @private
     *
     * @param {Object|String} info
     */
    _setInfo: function (info) {
      if (info === undefined) {
        this.info({ message: this.message(), description: this.description() });
        return;
      }

      let message = info, description = null;

      if (info && typeof info == 'object') {
        message = info.message ?? null;
        description = info.description ?? null;
      }

      !message ? this.message.valueHasMutated() : this.message(message);
      !description ? this.description.valueHasMutated() : this.description(description);
    }
  });
});
