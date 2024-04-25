define([
  'uiComponent',
  'uiRegistry',
  'videojs'
], function (uiComponent, uiRegistry, videojs) {
  'use strict';

  /**
   * Component for configuration of VideoJs player library
   * @see https://videojs.com
   */
  return uiComponent.extend({
    defaults: {
      languages: {
        ru: 'videojs/lang/ru'
      },
      components: {
        titleBar: '${ $.name }.titleBar',
        bigPlayButton: '${ $.name }.bigPlayButton',
        posterImage: '${ $.name }.posterImage',
        errorInfo: '${ $.name }.errorInfo'
      },
      modules: {
        titleBar: '${ $.components.titleBar }',
        bigPlayButton: '${ $.components.bigPlayButton }',
        posterImage: '${ $.components.posterImage }',
        errorInfo: '${ $.components.errorInfo }'
      }
    },

    /**
     * Component initialization
     * @public
     *
     * @return {Object}
     */
    initialize: function () {
      this._super();

      this._addLanguages();
      this._registerComponents();

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
      this.bigPlayButton().active.valueHasMutated();
      this.posterImage().animation(
        component => component.element().style.visibility = 'hidden'
      );

      return videojs(id, options, ready);
    },

    /**
     * Display error information
     * @public
     *
     * @param {String|null} message
     * @param {String|null} description
     */
    error: function (message = null, description = null) {
      this.errorInfo().show(message, description);
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
      Object.entries(this.components).forEach(([name, query]) =>
          uiRegistry.get(query, uiComponent =>
            videojs.registerComponent(name, uiComponent.videojsComponent))
      );
    }
  });
});
