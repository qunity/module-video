define([
  'video/m2Component',
  'video/vjsBigButton'
], function (m2Component, vjsBigButton) {
  'use strict';

  /**
   * BigButton UI component for Magento video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsBigButton,
      template: 'Qunity_Video/video/component/big-button',
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
