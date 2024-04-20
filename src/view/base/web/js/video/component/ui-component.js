// noinspection JSUnusedGlobalSymbols

define([
  'uiComponent'
], function (uiComponent) {
  'use strict';

  /**
   * UI component for Magento Video
   */
  return uiComponent.extend({

    /**
     * Component initialization
     * @public
     *
     * @returns {Object}
     */
    initialize: function () {
      this._super();

      if (this.videojsComponent) {
        this.videojsComponent.wrapper = this;
        this.videojsComponentName = this.videojsComponent.name;
      }

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
      this.observe(['element']);

      return this;
    },

    /**
     * Set base HTML element of component
     * @public
     *
     * @param {HTMLElement} element
     */
    setElement: function (element) {
      this.element(element);
    }
  });
});
