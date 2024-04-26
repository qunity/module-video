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
        this._initialize(player, options);
      }

      /**
       * Get component wrapper
       * @public
       *
       * @returns {m2Component}
       */
      get wrapper() {
        const value = this.constructor.wrapper;

        if (value === null || typeof value !== 'object') {
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
        if (value === null || typeof value !== 'object') {
          throw new Error('Inputted wrapper value is not an object');
        }

        if (this.constructor.wrapper) {
          throw new Error('Class wrapper is already installed');
        }

        this.constructor.wrapper = value;
      }

      /**
       * Create HTML element
       * @public
       *
       * @returns {HTMLElement}
       */
      createEl() {
        // noinspection JSUnresolvedReference
        return this.wrapper.element();
      }

      /**
       * Component initialization
       * @private
       *
       * @param {Object} player
       * @param {Object} options
       */
      _initialize(player, options) {
        // ...
      }
    };

    vjsComponent.wrapper = m2Component;

    return vjsComponent;
  };
});
