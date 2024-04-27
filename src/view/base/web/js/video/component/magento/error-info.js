define([
  'video/m2Component',
  'video/vjsErrorInfo',
  'mage/translate'
], function (m2Component, vjsErrorInfo, $t) {
  'use strict';

  /**
   * Error info UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsErrorInfo,
      template: 'Qunity_Video/video/component/error-info',
      svgTemplate: 'Qunity_Video/video/component/error-info/svg-icon',
      defaultMessage: $t('Playback error.'),
      defaultDescription: $t('Please try again later or contact your administrator.')
    },

    /**
     * @inheritDoc
     */
    initialize: function () {
      this._super();

      this.initDefaultInfo();
      this.initSvgIcon();

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
      this.message(this.defaultMessage);
      this.description(this.defaultDescription);

      return this;
    },

    /**
     * Initializes SVG icon
     * @public
     *
     * @returns {uiComponent}
     */
    initSvgIcon: function () {
      this.downloadSvgIcon(svgIcon => { this.svgIcon = svgIcon });

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
      this.message(message ?? this.defaultMessage);
      this.description(description ?? this.defaultDescription);

      this.display(true);
    }
  });
});
