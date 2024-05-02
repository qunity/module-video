define([
  'video/m2Component',
  'video/vjsBigPlayButton'
], function (m2Component, vjsBigPlayButton) {
  'use strict';

  /**
   * BigPlayButton UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsBigPlayButton,
      template: 'Qunity_Video/video/component/big-play-button',
      active: 'play'
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['active']);

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
     * Activate button state
     * @public
     */
    activeButton: function () {
      this.animate();
    }
  });
});
