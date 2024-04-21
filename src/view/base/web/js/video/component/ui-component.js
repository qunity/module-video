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
      this.initSubscriber();

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
     * Initializes subscription properties
     * @public
     *
     * @returns {Object}
     */
    initSubscriber: function () {
      return this;
    },

    /**
     * Set base HTML element
     * @public
     *
     * @param {HTMLElement} element
     */
    setElement: function (element) {
      this.element(element);
    },

    /**
     * Remove base HTML element
     * @public
     */
    removeElement: function () {
      this.element().remove();
    }
  });
});
