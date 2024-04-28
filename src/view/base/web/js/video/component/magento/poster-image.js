define([
  'video/m2Component',
  'video/vjsPosterImage'
], function (m2Component, vjsPosterImage) {
  'use strict';

  /**
   * Poster image UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsPosterImage,
      template: 'Qunity_Video/video/component/poster-image',
      imports: {
        src: '${ $.name }:options.src',
        alt: '${ $.name }:options.alt'
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
