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
      this.observe(['info', 'src', 'alt']);

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
     * Set poster information
     * @private
     *
     * @param {Object|String} info
     */
    _setInfo: function (info) {
      if (info === undefined) {
        this.info({ src: this.src(), alt: this.alt() });
        return;
      }

      let src = info, alt = null;

      if (info && typeof info == 'object') {
        src = info.src ?? null;
        alt = info.alt ?? null;
      }

      !src ? this.src.valueHasMutated() : this.src(src);
      !alt ? this.alt.valueHasMutated() : this.alt(alt);
    }
  });
});
