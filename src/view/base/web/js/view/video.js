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
      options: {
        preload: 'auto',
        techOrder: [ 'html5' ],
        sources: [{ type: 'video/mp4' }],
        playbackRates: [ 0.5, 1, 1.5, 2 ],
        htmlClass: {
          theme: 'vjs-m2luma-skin',
          creating: 'vjs-creating',
          startTime: 'vjs-start-time',
          finalTime: 'vjs-final-time',
          waiting: 'vjs-waiting',
          playing: 'vjs-playing',
          error: 'vjs-error'
        },
        width: 640,
        height: 360,
        poster: true,
        controls: true,
        autoplay: true,
        loop: false,
        autoSetup: false,
        translation: false,
        noUITitleAttributes: true,
        experimentalSvgIcons: true,
        errorDisplay: false,
        controlBar: {
          pictureInPictureToggle: false,
          playToggle: { replay: true },
          volumePanel: { inline: true, volume: 0.73 }
        },
        loadingSpinner: false,
        topBar: true,
        posterImage: true,
        bigButton: true,
        spinner: true,
        errorInfo: true,
        titleBar: false,
        bigPlayButton: false,
        liveTracker: false,
        textTrackDisplay: false,
        textTrackSettings: false
      },
      creationTimeout: 1000
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
      } catch (e) {
        player.critical();
        throw e;
      }

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
        this._creationTimeout();
      } catch (e) {
        player.critical();
        throw e;
      }

      return this;
    },

    /**
     * Process execute when before video player creating
     * @public
     *
     * @var {HTMLElement} element
     */
    onStartCreatingEvent: function (element) {
      element.classList.add(this.options.htmlClass.creating);
    },

    /**
     * Process execute when after video player creating
     * @public
     *
     * @var {HTMLElement} element
     */
    onFinalCreatingEvent: function (element) {
      element.classList.remove(this.options.htmlClass.creating);
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
      /** @var {Integer} currentTime */
      const currentTime = player.currentTime();

      this._processElementClass(
        this.options.htmlClass.startTime,
        currentTime,
        { from: 0.0, to: 1.0 }
      );

      /** @var {Integer} duration */
      const duration = player.duration();
      this._processElementClass(
        this.options.htmlClass.finalTime,
        currentTime,
        { from: duration - 1.0, to: duration }
      );
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
      player.errorInfo.wrapper.visible(true);
      player.off();
    },

    /**
     * Adding HTML class to element at given time period
     * @private
     *
     * @param {Integer} time
     * @param {String} className
     * @param {{from:Integer,to:Integer}} diapasonTime
     */
    _processElementClass(className, time, diapasonTime) {
      /** @var {HTMLElement} element */
      const element = this.element();

      if (!(time >= diapasonTime.from && time < diapasonTime.to)) {
        element.classList.remove(className);
        return;
      }

      if (!this.element().classList.contains(className)) {
        element.classList.add(className)
      }
    },

    /**
     * Timeout handler for creation player process
     * @private
     */
    _creationTimeout: function () {
      const timer = setTimeout(() => {
        /** @var {DOMTokenList} classList */
        const classList = this.element().classList;

        if (!classList.contains(this.options.htmlClass.playing) &&
          !classList.contains(this.options.htmlClass.error)
        ) {
          classList.add(this.options.htmlClass.waiting);
        }

        clearTimeout(timer);
      }, this.creationTimeout);
    }
  });
});
