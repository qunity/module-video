define([
  'uiComponent',
  'mage/translate'
], function (uiComponent, $t) {
  'use strict';

  /**
   * Main UI Video component for Magento
   */
  return uiComponent.extend({
    defaults: {
      options: {
        preload: 'auto',
        techOrder: [ 'html5' ],
        sources: [ { type: 'video/mp4' } ],
        theme: 'vjs-m2luma-skin',
        width: 640,
        height: 360,
        controls: true,
        autoplay: true,
        loop: false,
        autoSetup: true,
        experimentalSvgIcons: true,
        errorDisplay: false,
        controlBar: {
          pictureInPictureToggle: false,
          playToggle: { replay: true },
          volumePanel: { inline: true }
        },
        loadingSpinner: true,

        topBar: { title: null },
        posterImage: { src: null, alt: null },
        bigPlayButton: true,
        errorInfo: {
          message: $t('Playback error.'),
          description: $t('Please try again later or contact your administrator.')
        },

        titleBar: false,
        liveTracker: false,
        textTrackDisplay: false,
        textTrackSettings: false,
      },
      template: 'Qunity_Video/video',
      modules: {
        player: '${ $.name }.player'
      },
      exports: {
        options: '${ $.name }.player:options'
      }
    },

    /**
     * Component initialization
     * @public
     *
     * @returns {uiComponent}
     */
    initialize: function () {
      this._super();
      this.initSubscriber();

      return this;
    },

    /**
     * Initializes observable properties
     * @public
     *
     * @returns {uiComponent}
     */
    initObservable: function () {
      this._super();
      this.observe(['element']);

      return this;
    },

    /**
     * Initializes subscription properties
     * @public
     *
     * @returns {uiComponent}
     */
    initSubscriber: function () {
      return this;
    }
  });
});
