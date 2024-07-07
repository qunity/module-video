define([
  'uiVideo',
  'videojs/youtube'
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
        youtube: {
          enablePrivacyEnhancedMode: true,
          disablePictureInPicture: true
        }
      }
    }
  });
});
