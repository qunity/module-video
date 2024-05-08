define([
  'videojs'
], function (videojs) {
  'use strict';

  /**
   * Base class of component for VideoJs player
   */
  return function (m2Component) {
    const vjsComponent = class extends videojs.getComponent('Component') {

      /**
       * Component constructor
       * @public
       *
       * @param {Object} player
       * @param {Object} options
       */
      constructor(player, options = {}) {
        super(player, options);
        this.initialize(player, options);
      }

      /**
       * Get component wrapper
       * @public
       *
       * @return {m2Component}
       */
      get wrapper() {
        if (this.constructor.wrapper === undefined) {
          throw new Error('Class wrapper has not been installed');
        }

        return this.constructor.wrapper;
      }

      /**
       * Set component wrapper
       * @public
       *
       * @param {m2Component} value
       */
      set wrapper(value) {
        if (this.constructor.wrapper) {
          throw new Error('Class wrapper is already installed');
        }

        this.constructor.wrapper = value;
      }

      /**
       * Component initialization
       * @public
       *
       * @param {Object} player
       * @param {Object} options
       */
      initialize(player, options) {
        // ...
      }

      /**
       * Create HTML element of component
       * @public
       *
       * @return {HTMLElement}
       */
      createEl() {
        // noinspection JSUnresolvedReference
        return this.wrapper.element();
      }
    };

    vjsComponent.wrapper = m2Component;

    return vjsComponent;
  };
});
