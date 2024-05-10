define([
  'uiComponent'
], function (uiComponent) {
  'use strict';

  /**
   * Main UI video component for Magento
   */
  return uiComponent.extend({
    defaults: {
      template: 'Qunity_Video/video',
      modules: {
        player: '${ $.ns }.player'
      },
      exports: {
        options: '${ $.ns }.player:options'
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
        posterImage: {
          src: null,
          alt: null,
          animation: { startClass: 'vjs-start-time', finalClass: 'vjs-final-time' }
        },
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
     * @return {uiComponent}
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
     * @return {uiComponent}
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
     * @return {uiComponent}
     */
    initSubscriber: function () {
      return this;
    },

    /**
     * Initializes video player
     * @public
     *
     * @return {uiComponent}
     */
    initVideoPlayer: function () {
      const player = this.player();

      try {
        player.init();
      } catch (e) { player.critical(); throw e; }

      return this;
    },

    /**
     * Creates video player
     * @public
     *
     * @return {uiComponent}
     */
    createVideoPlayer: function () {
      const player = this.player();

      try {
        player.create();
      } catch (e) { player.critical(); throw e; }

      return this;
    },

    /**
     * Process execute when video player is ready
     * @public
     *
     * @param {Object} player
     */
    onReadyEvent: function (player) {
      player.volume(this.options.controlBar.volumePanel.volume);
    },

    /**
     * Process execute when video player time has changed
     * @public
     *
     * @param {Object} player
     */
    onTimeUpdateEvent: function (player) {
      // ...
    },

    /**
     * Process execute when video player is ended playing
     * @public
     *
     * @param {Object} player
     */
    onEndedEvent: function (player) {
      if (player.isFullscreen()) {
        player.exitFullscreen();
      }
    },

    /**
     * Process execute when video player is error
     * @public
     *
     * @param {Object} player
     */
    onErrorEvent: function (player) {
      player.critical.valueHasMutated();
      player.off();
    }
  });
});
