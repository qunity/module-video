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
        topBar: '${ $.name }.topBar',
        bigPlayButton: '${ $.name }.bigPlayButton',
        posterImage: '${ $.name }.posterImage',
        errorInfo: '${ $.name }.errorInfo'
      },
      loadingClass: 'vjs-loading'
    },

    /**
     * Video player initialization
     * @public
     */
    init: function () {
      this._addLanguages();
      this._registerComponents();
    },

    /**
     * Create Video player
     * @public
     */
    create: function () {
      this.parent().element().classList.add(this.loadingClass);
      this.vjsplayer = videojs(this.options.id, this.options);
      this.vjsplayer.one('canplay', () => this.vjsplayer.el().classList.remove(this.loadingClass));
    },

    /**
     * Displaying information about critical error
     * @public
     *
     * @param {String|null} message
     * @param {String|null} description
     */
    critical: function (message = null, description = null) {
      this.vjsplayer.critical({ message: message, description: description });
    },

    /**
     * Add languages to Video player
     * @private
     */
    _addLanguages: function () {
      Object.entries(this.languages).forEach(([name, language]) =>
        videojs.addLanguage(name, language));
    },

    /**
     * Register components into Video player
     * @private
     */
    _registerComponents: function () {
      Object.entries(this.components).forEach(([name, uiComponent]) =>
        videojs.registerComponent(name, uiComponent.videojsComponent));
    }
  });
});
