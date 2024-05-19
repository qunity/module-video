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
        options: '${ $.ns }.player:options',
        events: '${ $.ns }.player:events',
        classes: '${ $.ns }.player:classes'
      },
      events: {
        startCreating: 'start-creating',
        finalCreating: 'final-creating'
      },
      classes: {
        startTime: 'vjs-start-time',
        finalTime: 'vjs-final-time',
        creating: 'vjs-creating'
      },
      options: {
        preload: 'auto',
        techOrder: [ 'html5' ],
        sources: [{ type: 'video/mp4' }],
        playbackRates: [ 0.5, 1, 1.5, 2 ],
        theme: 'vjs-m2luma-skin',
        width: 640,
        height: 360,
        controls: true,
        autoplay: true,
        loop: false,
        autoSetup: false,
        noUITitleAttributes: true,
        experimentalSvgIcons: true,
        errorDisplay: false,
        controlBar: {
          pictureInPictureToggle: false,
          playToggle: { replay: true },
          volumePanel: { inline: true, volume: 0.73 }
        },
        loadingSpinner: true,
        topBar: { title: null, description: null },
        posterImage: { src: null, alt: null },
        bigButton: true,
        errorInfo: { message: null, description: null },
        titleBar: false,
        bigPlayButton: false,
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
      this.element.subscribe(element => {
        element.addEventListener(
          this.events.startCreating,
          this.onStartCreatingEvent.bind(this)
        );

        element.addEventListener(
          this.events.finalCreating,
          this.onFinalCreatingEvent.bind(this)
        );
      });

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
      } catch (e) {
        player.critical();
        throw e;
      }

      return this;
    },

    /**
     * Process execute when before video player creating
     * @public
     */
    onStartCreatingEvent: function () {
      this.element().classList.add(this.classes.creating);
    },

    /**
     * Process execute when after video player creating
     * @public
     */
    onFinalCreatingEvent: function () {
      this.element().classList.remove(this.classes.creating);
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
        this.classes.startTime,
        currentTime,
        { from: 0.0, to: 1.0 }
      );

      /** @var {Integer} duration */
      const duration = player.duration();
      this._processElementClass(
        this.classes.finalTime,
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
     *
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
    }
  });
});
