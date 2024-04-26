define([
  'uiComponent',
  'uiRegistry'
], function (uiComponent, uiRegistry) {
  'use strict';

  /**
   * Abstracted video component with general methods for base video components
   */
  return uiComponent.extend({
    defaults: {
      languages: {
        ru: 'videojs/lang/ru'
      },
      components: {
        titleBar: '${ $.parentName }.player.titleBar',
        bigPlayButton: '${ $.parentName }.player.bigPlayButton',
        posterImage: '${ $.parentName }.player.posterImage',
        errorInfo: '${ $.parentName }.player.errorInfo'
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
      this.initComponents();
      this.initLanguages();

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
     * Initializes registered languages
     * @public
     *
     * @returns {uiComponent}
     */
    initLanguages: function () {
      const names = Object.keys(this.languages);

      require(names.map(name => `json!${this.languages[name]}`), ...languages =>
        names.forEach((name, index) => this.languages[name] = languages[index]));

      return this;
    },

    /**
     * Initializes registered components
     * @public
     *
     * @returns {uiComponent}
     */
    initComponents: function () {
      Object.entries(this.components).forEach(([name, query]) =>
        uiRegistry.get(query, uiComponent => this.components[name] = uiComponent));

      return this;
    }
  });
});
