define([
  'video/m2Component',
  'video/vjsPosterImage'
], function (m2Component, vjsPosterImage) {
  'use strict';

  /**
   * PosterImage UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsPosterImage,
      template: 'Qunity_Video/video/component/poster-image',
      pixel: 'Qunity_Video/images/video/component/poster-image/pixel.webp',
      imports: {
        src: '${ $.name }:options.src',
        alt: '${ $.name }:options.alt'
      },
      observable: ['src', 'alt']
    },
    onerror: 'this.src=require.toUrl("%s");',

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
