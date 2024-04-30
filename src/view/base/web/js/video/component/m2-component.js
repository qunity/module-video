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
     * @param {VoidFunction} callback
     */
    animate: function (callback) {
      const element = this.element(), fnRemoveClass = () => {
        element.classList.remove(this.animationClass);
        callback ? callback(this) : false;
      };

      element.classList.add(this.animationClass);
      element.addEventListener('animationend', fnRemoveClass, { once: true });
    },

    /**
     * Update observable properties of VideoJs component
     * @private
     *
     * @param {Object} info
     */
    _updateVideoJsObservable: function (info) {
      this.observable.forEach(name => {
        const value = info[name] ?? null;
        !value ? this[name].valueHasMutated() : this[name](value);
      });
    }
  });
});
