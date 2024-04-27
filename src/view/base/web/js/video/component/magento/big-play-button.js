define([
  'video/m2Component',
  'video/vjsBigPlayButton'
], function (m2Component, vjsBigPlayButton) {
  'use strict';

  /**
   * Big play button UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsBigPlayButton,
      template: 'Qunity_Video/video/component/big-play-button',
      svgIcons: {
        play: 'Qunity_Video/video/component/big-play-button/icon-play',
        pause: 'Qunity_Video/video/component/big-play-button/icon-pause'
      },
      svgIcon: null,
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
      this.observe(['svgIcon', 'active']);

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
     * Initializes starting SVG icon
     * @public
     *
     * @returns {uiComponent}
     */
    initSvgButton: function () {
      const types = Object.keys(this.svgIcons);

      this.downloadSvgIcons(Object.values(this.svgIcons), function (...svgIcons) {
        types.forEach((type, index) => this.svgIcons[type] = svgIcons[index]);

        this.changeSvgButton(this.active());
      }.bind(this));

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
     * Change SVG icon for button
     * @public
     *
     * @param {String} type
     */
    changeSvgButton: function (type) {
      this.svgIcon(this.svgIcons[type]);
    }
  });
});
