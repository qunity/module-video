define([
  'video/uiComponent',
  'videojs/component/title-bar'
], function (uiComponent, titleBar) {
  'use strict';

  /**
   * Title bar UI component for Magento VideoPlayer
   */
  return uiComponent.extend({
    defaults: {
      videojsComponent: titleBar
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['title']);

      return this;
    }
  });
});
