define([
  'videojs',
  'json!videojs/lang/ru',
  'videojs/component/title-bar',
  'videojs/component/big-play-button',
  'videojs/component/poster-image',
  'uiRegistry',
  'ko'
], function (videojs, ru, titleBar, bigPlayButton, posterImage, uiRegistry, ko) {
  'use strict';

  /**
   * Component for general configuration of VideoJs player
   * @see https://videojs.com
   */
  return {
    config: {
      languages: {
        'ru': ru
      },
      components: {
        'titleBar': titleBar,
        'bigPlayButton': bigPlayButton,
        'posterImage': posterImage
      }
    },
    uiComponents: ko.observable({}),
    initialized: ko.observable(false),

    /**
     * Component initialization
     * @public
     *
     * @return {Object}
     */
    initialize: function () {
      if (!this.initialized()) {
        this._configure();
      }

      return this;
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

      return videojs(id, options, ready);
    },

    /**
     * Get language dictionary
     * @public
     *
     * @param {String} name
     * @returns {{String:String}}
     */
    getLanguage: function (name) {
      if (!this.config.languages.hasOwnProperty(name)) {
        throw new Error(`Video player language dictionary not found: ${name}`);
      }

      return this.config.languages[name];
    },

    /**
     * Get player static component
     * @public
     *
     * @param {String} name
     * @returns {Class}
     */
    getComponent: function (name) {
      if (!this.config.components.hasOwnProperty(name)) {
        throw new Error(`Video player component not found: ${name}`);
      }

      return this.config.components[name];
    },

    /**
     * Video player configuration process
     * @private
     */
    _configure: function () {
      this._addLanguages();
      this._registerComponents();
      this._loadUiComponents();
    },

    /**
     * Add languages to Video player
     * @private
     */
    _addLanguages: function () {
      Object.keys(this.config.languages)
        .forEach(name => videojs.addLanguage(name, this.getLanguage(name)));
    },

    /**
     * Register components into Video player
     * @private
     */
    _registerComponents: function () {
      Object.keys(this.config.components)
        .forEach(name => videojs.registerComponent(name, this.getComponent(name)));
    },

    /**
     * Subscribe UI components load process
     * @private
     */
    _loadUiComponents: function () {
      Object.keys(this.config.components).forEach(name => {
        const query = `videojsComponentName = ${this.getComponent(name).name}`;
        uiRegistry.get(query, this._loadUiComponent.bind(this, name));
      });

      this.uiComponents.subscribe(this._changeUiComponents.bind(this));
    },

    /**
     * Subscribe of rendering loaded UI component
     * @private
     *
     * @param {String} name
     * @param {Object} uiComponent
     */
    _loadUiComponent: function (name, uiComponent) {
      uiComponent.element.subscribe(value => {
        if (typeof value !== 'object') {
          throw new Error(`Element of component '${name}' is not an HTML element`);
        }

        let item = {};
        item[name] = uiComponent;
        this.uiComponents({ ...this.uiComponents(), ...item });
      });
    },

    /**
     * Processing change of UI components list
     * @private
     *
     * @param {Object} uiComponents
     */
    _changeUiComponents: function (uiComponents) {
      const uiComponentsKeys = Object.keys(uiComponents),
        vjsComponentsKeys = Object.keys(this.config.components),
        difference = vjsComponentsKeys.filter(name => !uiComponentsKeys.includes(name));

      this.initialized(Boolean(difference.length));
    }
  }.initialize();
});
