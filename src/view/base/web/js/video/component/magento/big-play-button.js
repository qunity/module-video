define([
  'video/m2Component',
  'video/vjsBigPlayButton',
  'mage/template'
], function (m2Component, vjsBigPlayButton, mageTemplate) {
  'use strict';

  /**
   * Big play button UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsBigPlayButton,
      template: 'Qunity_Video/video/component/big-play-button',
      svgTemplate: 'Qunity_Video/video/component/big-play-button/svg-image',
      svgButtons: {
        play: 'M16 10v28l22-14z',
        pause: 'M12 38h8V10h-8v28zm16-28v28h8V10h-8z'
      },
      svgImage: null,
      active: 'play'
    },

    /**
     * @inheritDoc
     */
    initialize: function () {
      this._super();
      this.initSvgButton();

      return this;
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['svgImage', 'active']);

      return this;
    },

    /**
     * @inheritDoc
     */
    initSubscriber: function () {
      this._super();
      this.active.subscribe(this.activeButton.bind(this));

      return this;
    },

    /**
     * Initializes starting SVG image
     * @public
     *
     * @returns {uiComponent}
     */
    initSvgButton: function () {
      const path = this.svgTemplate
        .replace(/^(\w+_\w+)/, '$1/template');

      require([`text!${path}.html`], svgImageTpl => {
        this.svgImageTpl = svgImageTpl;
        this.changeSvgButton(this.active());
      });

      return this;
    },

    /**
     * Set active button by it type
     * @public
     *
     * @param {String} type
     *
     */
    activeButton: function (type) {
      this.changeSvgButton(type);
      this.animate();
    },

    /**
     * Change SVG image for button
     * @public
     *
     * @param {String} type
     */
    changeSvgButton: function (type) {
      this.svgImage(mageTemplate(this.svgImageTpl, { path: this.svgButtons[type] }));
    }
  });
});
