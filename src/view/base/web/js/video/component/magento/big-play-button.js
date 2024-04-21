// noinspection JSUnusedGlobalSymbols

define([
  'video/uiComponent',
  'videojs/component/big-play-button',
  "mage/template"
], function (uiComponent, vjsBigPlayButton, mageTemplate) {
  'use strict';

  /**
   * Big play button UI component for Magento VideoPlayer
   */
  return uiComponent.extend({
    defaults: {
      videojsComponent: vjsBigPlayButton,
      buttons: {
        play: 'M16 10v28l22-14z',
        pause: 'M12 38h8V10h-8v28zm16-28v28h8V10h-8z'
      },
      svgId: 'big-button-svg-${ $.ns }',
      active: 'play'
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['svg', 'active']);

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
     * Set active button by it type
     * @public
     *
     * @param {String} type
     *
     */
    activeButton: function (type) {
      this._changeSvgButton(type);
      this._getButtonElement().classList.add('_animate');
    },

    /**
     * Completing button animation
     * @public
     */
    animationComplete: function () {
      this._getButtonElement().classList.remove('_animate');
    },

    /**
     * Initialize SVG image for button
     * @public
     */
    initialSvgButton: function () {
      this._changeSvgButton(this.active());
    },

    /**
     * Change SVG image for button
     * @private
     *
     * @param {String} type
     */
    _changeSvgButton: function (type) {
      this.svg(mageTemplate(`#${this.svgId}`, { path: this.buttons[type] }));
    },

    /**
     * Get button element from base element children
     * @private
     *
     * @return {HTMLElement}
     */
    _getButtonElement: function () {
      return this.element().querySelector(':first-child');
    }
  });
});
