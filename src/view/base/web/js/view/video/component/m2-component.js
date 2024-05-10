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
      animationClass: '_animate',
      observable: []
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
      this.observe(['element', 'info']);

      return this;
    },

    /**
     * Initializes subscription properties
     * @public
     *
     * @return {uiComponent}
     */
    initSubscriber: function () {
      this.info.subscribe(this._updateVideoJsObservable.bind(this));

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
     * Animate component elements
     * @public
     *
     * @param {String|null} name
     * @param {VoidFunction|null} callback
     */
    animate: function (name = null, callback = null) {
      /** @var {String} animationClass */
      const animationClass = name ? `${this.animationClass}-${name}` : this.animationClass;

      /** @var {HTMLElement} element */
      const element = this.element();

      /** @var {VoidFunction} fnRemoveClass */
      const fnRemoveClass = () => {
        element.classList.remove(animationClass);
        if (callback) callback(element);
      };

      element.classList.add(animationClass);
      element.addEventListener('animationend', fnRemoveClass, { once: true });
    },

    /**
     * Update observable properties of VideoJs component
     * @private
     *
     * @param {Object|undefined} info
     */
    _updateVideoJsObservable: function (info) {
      if (info === undefined) {
        this.info(this._getObservableData());
        return;
      }

      this.observable.forEach(name => {
        const value = info[name] ?? null;
        !value ? this[name].valueHasMutated() : this[name](value);
      });
    },

    /**
     * Get current data from observable properties
     * @private
     *
     * @return {Object}
     */
    _getObservableData: function () {
      let data = {};
      this.observable.forEach(name => data[name] = this[name]());

      return data;
    }
  });
});
