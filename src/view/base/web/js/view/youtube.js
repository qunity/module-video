define([
  'uiVideo',
  'videojs/youtube'
], function (uiVideo) {
  'use strict';

  /**
   * YouTube UI Video component for Magento
   */
  return uiVideo.extend({
    defaults: {
      options: {
        techOrder: [ 'youtube' ],
        sources: [{ type: 'video/youtube' }],
        loadingSpinner: false,
        youtube: { enablePrivacyEnhancedMode: true }
      }
    }
  });
});
