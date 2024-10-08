define([
  'video/uiAbstract',
  'videojs'
], function (uiAbstract, videojs) {
  'use strict';

  /**
   * Component for configuration of VideoJs player library
   * @see https://videojs.com
   */
  return uiAbstract.extend({
    defaults: {
      modules: {
        parent: '${ $.parentName }',
        errorInfo: '${ $.components.errorInfo }'
      }
    },

    /**
     * Initializes video player
     * @public
     */
    init: function () {
      this._addLanguages();
      this._registerComponents();
    },

    /**
     * Creates video player
     * @public
     */
    create: function () {
      this.vjsplayer = this._createVjsPlayer();

      this.vjsplayer.on('ready', this._onReady.bind(this));
      this.vjsplayer.on('timeupdate', this._onTimeUpdate.bind(this));
      this.vjsplayer.on('ended', this._onEnded.bind(this));
      this.vjsplayer.on('error', this._onError.bind(this));
    },

    /**
     * Displaying information about critical error
     * @public
     *
     * @param {String|null} message
     * @param {String|null} description
     */
    critical: function (message = null, description = null) {
      /** @var {Object} errorInfo */
      const errorInfo = this.errorInfo();

      if (message) errorInfo.message(message);
      if (description) errorInfo.description(description);

      errorInfo.visible(true);
    },

    /**
     * Creates VideoJs player
     * @private
     *
     * @return {Object}
     */
    _createVjsPlayer: function () {
      this._onStartCreating();
      const player = videojs(this.options.id, this.options);

      this.parent().element(player.el());
      player.on('ready', this._onFinalCreating.bind(this));

      return player;
    },

    /**
     * Process execute when before video player creating
     * @private
     */
    _onStartCreating: function () {
      const video = this.parent();
      video.onStartCreatingEvent(video.element());
    },

    /**
     * Process execute when after video player creating
     * @private
     */
    _onFinalCreating: function () {
      const video = this.parent();
      video.onFinalCreatingEvent(video.element());
    },

    /**
     * Process execute when video player is ready
     * @private
     */
    _onReady: function () {
      this.parent().onReadyEvent(this.vjsplayer);
    },

    /**
     * Process execute when video player time has changed
     * @private
     */
    _onTimeUpdate: function () {
      this.parent().onTimeUpdateEvent(this.vjsplayer);
    },

    /**
     * Process execute when video player is ended playing
     * @private
     */
    _onEnded: function () {
      this.parent().onEndedEvent(this.vjsplayer);
    },

    /**
     * Process execute when video player is error
     * @private
     */
    _onError: function () {
      this.parent().onErrorEvent(this.vjsplayer);
    },

    /**
     * Add languages to video player
     * @private
     */
    _addLanguages: function () {
      Object.entries(this.languages).forEach(([name, language]) =>
        typeof language === 'object' ? videojs.addLanguage(name, language) : false);
    },

    /**
     * Register components into video player
     * @private
     */
    _registerComponents: function () {
      Object.entries(this.components).forEach(([name, uiComponent]) =>
        videojs.registerComponent(name, uiComponent.videojsComponent));
    }
  });
});
