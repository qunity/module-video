define([
  'video/uiComponent',
  'videojs/component/poster-image'
], function (uiComponent, vjsPosterImage) {
  'use strict';

  /**
   * Poster image UI component for Magento VideoPlayer
   */
  return uiComponent.extend({
    defaults: {
      videojsComponent: vjsPosterImage,
      imports: {
        'alt': '${ $.parentName }.titleBar:title'
      }
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['src', 'alt']);

      return this;
    }
  });
});
