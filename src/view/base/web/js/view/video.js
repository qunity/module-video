define([
  'uiComponent'
], function (uiComponent) {
  'use strict';

  /**
   * Main UI Video component for Magento
   */
  return uiComponent.extend({
    defaults: {
      template: 'Qunity_Video/video',
      modules: {
        player: '${ $.name }.player'
      },
      exports: {
        options: '${ $.name }.player:options'
      },
      options: {
        preload: 'auto',
        techOrder: [ 'html5' ],
        sources: [{ type: 'video/mp4' }],
        theme: 'vjs-m2luma-skin',
        width: 640,
        height: 360,
        controls: true,
        autoplay: true,
        loop: false,
        autoSetup: false,
        experimentalSvgIcons: true,
        errorDisplay: false,
        controlBar: {
          pictureInPictureToggle: false,
          playToggle: { replay: true },
          volumePanel: { inline: true, volume: '0.73' }
        },
        loadingSpinner: true,
        topBar: { title: null, description: null },
        posterImage: { src: null, alt: null },
        bigPlayButton: true,
        errorInfo: { message: null, description: null },
        titleBar: false,
        liveTracker: false,
        textTrackDisplay: false,
        textTrackSettings: false
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
    },

    /**
     * Initializes VideoJs player
     * @public
     */
    initVideoPlayer: function () {
      try {
        this.player().init();
      } catch (e) {
        this.player().critical();
        throw e;
      }
    },

    /**
     * Creates VideoJs player
     * @public
     */
    createVideoPlayer: function () {
      try {
        this.player().create();
      } catch (e) {
        this.player().critical();
        throw e;
      }
    },

    /**
     * Process execute when VideoJs player is ready
     * @public
     *
     * @param {Object} vjsPlayer
     */
    onReadyEvent: function (vjsPlayer) {
      vjsPlayer.volume(this.options.controlBar.volumePanel.volume);
    },

    /**
     * Process execute when VideoJs player is ended playing
     * @public
     *
     * @param {Object} vjsPlayer
     */
    onEndedEvent: function (vjsPlayer) {
      if (vjsPlayer.isFullscreen()) {
        vjsPlayer.exitFullscreen();
      }
    },

    /**
     * Process execute when VideoJs player is error
     * @public
     *
     * @param {Object} vjsPlayer
     */
    onErrorEvent: function (vjsPlayer) {
      this.player().critical();
      vjsPlayer.off();
    }
  });
});
