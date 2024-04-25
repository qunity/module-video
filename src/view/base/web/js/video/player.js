define([
  'uiComponent',
  'uiRegistry',
  'videojs'
], function (uiComponent, uiRegistry, videojs) {
  'use strict';

  /**
   * Component for general configuration of VideoJs player
   * @see https://videojs.com
   */
  return uiComponent.extend({
    defaults: {
      languages: {
        ru: 'videojs/lang/ru'
      },
      components: {
        titleBar: 'titleBar',
        bigPlayButton: 'bigPlayButton',
        posterImage: 'posterImage',
        errorInfo: 'errorInfo'
      },
      modules: {
        titleBar: '${ $.name }.titleBar',
        bigPlayButton: '${ $.name }.bigPlayButton',
        posterImage: '${ $.name }.posterImage',
        errorInfo: '${ $.name }.errorInfo'
      }
    },
    uiComponents: {},
    initialized: true, // TODO: избавиться от флага инициализации

    /**
     * Component initialization
     * @public
     *
     * @return {Object}
     */
    initialize: function () {
      this._super();

      this.initSubscriber();
      this.initPlayer();

      return this;
    },

    /**
     * Initializes observable properties
     * @public
     *
     * @returns {Object}
     */
    initObservable: function () {
      this._super();
      this.observe(['uiComponents', 'initialized']);

      return this;
    },

    /**
     * Initializes subscription properties
     * @public
     *
     * @returns {Object}
     */
    initSubscriber: function () {
      return this;
    },

    /**
     * Video player configuration process
     * @private
     */
    initPlayer: function () {
      this._addLanguages();
      this._registerComponents();
    },

    /**
     * Create new video player object
     * @public
     *
     * @param {String} id
     * @param {Object} options
     * @param {Function} ready
     *
     * @returns {Object}
     */
    create: function (id, options, ready) {
      if (!this.initialized()) {
        throw new Error('Video Player library is not initialized');
      }

      this.bigPlayButton().active.valueHasMutated();
      this.posterImage().animation(
        component => component.element().style.visibility = 'hidden'
      );

      return videojs(id, options, ready);
    },

    /**
     * ...
     * @public
     *
     * @param {String|null} message
     * @param {String|null} description
     */
    error: function (message = null, description = null) {
      this.errorInfo().error(message, description);
    },

    /**
     * Add languages to Video player
     * @private
     */
    _addLanguages: function () {
      const names = Object.keys(this.languages),
        query = names.map(name => `json!${this.languages[name]}`);

      require(query, function (...languages) {
        names.forEach((name, index) => videojs.addLanguage(name, languages[index]));
      });
    },

    /**
     * Register components into Video player
     * @private
     */
    _registerComponents: function () {
      const names = Object.keys(this.components),
        query = names.map(name => `${this.components[name]}`);

      query.forEach(name => {
        const query = `name = ${this.name}.${this.components[name]}`;
        uiRegistry.get(query, uiComponent => videojs.registerComponent(name, uiComponent.videojsComponent));
      });
    }
  });
});
