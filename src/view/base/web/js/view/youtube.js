define([
  'uiVideo'
], function (uiVideo) {
  'use strict';

  /**
   * YouTube UI video component for Magento
   */
  return uiVideo.extend({
    defaults: {
      options: {
        techOrder: [ 'youtube' ],
        sources: [{ type: 'video/youtube' }],
        loadingSpinner: false,
        youtube: { enablePrivacyEnhancedMode: true }
      }
    },

    /**
     * @inheritDoc
     */
    createVideoPlayer: function () {
      /** @var {Function} fnSuperCreateVideoPlayer */
      const fnSuperCreateVideoPlayer = this._super.bind(this);

      require(['videojs/youtube'], function () {
        fnSuperCreateVideoPlayer();
      }.bind(this));

      return this;
    }
  });
});
