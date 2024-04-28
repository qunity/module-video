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
      this.observe(['poster', 'src', 'alt']);

      return this;
    },

    /**
     * @inheritDoc
     */
    initSubscriber: function () {
      this._super();
      this.poster.subscribe(this._setPosterInfo.bind(this));

      return this;
    },

    /**
     * Set poster information
     * @private
     *
     * @param {Object|String|null} poster
     */
    _setPosterInfo: function (poster) {
      let src = poster, alt = null;

      if (poster && typeof poster == 'object') {
        src = poster.src ?? null;
        alt = poster.alt ?? null;
      }

      !src ? this.src.valueHasMutated() : this.src(src);
      !alt ? this.alt.valueHasMutated() : this.alt(alt);
    }
  });
});
