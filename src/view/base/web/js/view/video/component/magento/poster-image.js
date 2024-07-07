define([
  'video/m2Component',
  'video/vjsComponent'
], function (m2Component, vjsPosterImage) {
  'use strict';

  /**
   * PosterImage UI component for Magento video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsPosterImage,
      template: 'Qunity_Video/video/component/poster-image',
      pixel: 'Qunity_Base/images/pixel.webp',
      imports: {
        src: '${ $.name }:options.src',
        alt: '${ $.name }:options.alt',
        sizes: '${ $.name }:options.sizes',
        srcset: '${ $.name }:options.srcset'
      }
    },

    /**
     * @inheritDoc
     */
    initialize: function () {
      this._super();

      if (!this.src()) {
        this.src(require.toUrl(this.pixel));
      }

      return this;
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['src', 'alt', 'sizes', 'srcset']);

      return this;
    }
  });
});
