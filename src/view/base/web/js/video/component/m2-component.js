define([
  'uiComponent'
], function (uiComponent) {
  'use strict';

  /**
   * UI component for integration into Magento Video
   */
  return uiComponent.extend({
    defaults: {
      animationClass: '_animate'
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
      this.initVjsComponent();

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
     * Initializes VideoJs component
     * @public
     *
     * @returns {uiComponent}
     */
    initVjsComponent: function () {
      if (this.videojsComponent) {
        this.videojsComponent = this.videojsComponent(this);
      }

      return this;
    },

    /**
     * Animate component elements
     * @public
     *
     * @param {VoidFunction} callback
     */
    animate: function (callback = () => {}) {
      const element = this.element(), fnRemoveClass = () => {
        element.classList.remove(this.animationClass);
        callback(this);
      };

      element.classList.add(this.animationClass);
      element.addEventListener('animationend', fnRemoveClass, { once: true });
    }
  });
});
