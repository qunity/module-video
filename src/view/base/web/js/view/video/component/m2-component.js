define([
  'uiComponent'
], function (uiComponent) {
  'use strict';

  /**
   * UI component for integration into Magento video
   */
  return uiComponent.extend({
    defaults: {
      imports: {
        options: '${ $.ns }:options.${ $.index }'
      },
      animationClass: '_animate'
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
      this.initVjsComponent();

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
     * Initializes VideoJs component
     * @public
     *
     * @return {uiComponent}
     */
    initVjsComponent: function () {
      if (this.videojsComponent) {
        this.videojsComponent = this.videojsComponent(this);
      }

      return this;
    },

    /**
     * Animate component element
     * @public
     *
     * @param {String|null} name
     */
    animate: function (name = null) {
      /** @var {String} animationClass */
      const animationClass = name ? `${this.animationClass}-${name}` : this.animationClass;

      /** @var {HTMLElement} element */
      const element = this.element();

      /** @var {Function} fnRemoveClass */
      const fnRemoveClass = () => element.classList.remove(animationClass);

      element.classList.add(animationClass);
      element.addEventListener('animationend', fnRemoveClass, { once: true });
    }
  });
});
