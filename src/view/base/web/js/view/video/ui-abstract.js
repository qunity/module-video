define([
  'uiComponent',
  'uiRegistry'
], function (uiComponent, uiRegistry) {
  'use strict';

  /**
   * Abstracted video component with general methods
   */
  return uiComponent.extend({
    defaults: {
      imports: {
        options: '${ $.parentName }:options'
      },
      languages: {
        ru: 'videojs/lang/ru'
      },
      components: {
        topBar: '${ $.parentName }.player.topBar',
        bigButton: '${ $.parentName }.player.bigButton',
        posterImage: '${ $.parentName }.player.posterImage',
        errorInfo: '${ $.parentName }.player.errorInfo'
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
      this.initLanguages();
      this.initComponents();

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
     * Initializes registered languages
     * @public
     *
     * @return {uiComponent}
     */
    initLanguages: function () {
      /** @var {String[]} names */
      const names = this.options.translation ? Object.keys(this.languages) : [];

      require(names.map(name => `json!${this.languages[name]}`), function (...languages) {
        names.forEach((name, index) => this.languages[name] = languages[index]);
      }.bind(this));

      return this;
    },

    /**
     * Initializes registered components
     * @public
     *
     * @return {uiComponent}
     */
    initComponents: function () {
      Object.entries(this.components).forEach(([name, query]) =>
        uiRegistry.get(query, uiComponent => this.components[name] = uiComponent));

      return this;
    }
  });
});
