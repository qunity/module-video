define([
  'uiComponent'
], function (uiComponent) {
  'use strict';

  /**
   * UI component for integration into Magento Video
   */
  return uiComponent.extend({
    defaults: {
      animationClass: '_animate',
      imports: {
        options: '${ $.ns }:options.${ $.index }'
      },
      videojsObservable: []
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
      this.observe(['element', 'info']);

      return this;
    },

    /**
     * Initializes subscription properties
     * @public
     *
     * @returns {uiComponent}
     */
    initSubscriber: function () {
      this.info.subscribe(this._updateVideoJsObservable.bind(this));

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
     * @param {String} name
     * @param {VoidFunction} callback
     */
    animate: function (name = '', callback= () => {}) {
      const className = name ? `${this.animationClass}-${name}` : this.animationClass,
        element = this.element(), fnRemoveClass = () => {
        element.classList.remove(className);
        callback(element);
      };

      element.classList.add(className);
      element.addEventListener('animationend', fnRemoveClass, { once: true });
    },

    /**
     * Update observable properties of VideoJs component
     * @private
     *
     * @param {Object} info
     */
    _updateVideoJsObservable: function (info) {
      if (info === undefined) {
        info = {}; this.observable.forEach(name => info[name] = this[name]());
        return this.info(info);
      }

      this.observable.forEach(name => {
        const value = info[name] ?? null;
        !value ? this[name].valueHasMutated() : this[name](value);
      });
    }
  });
});
