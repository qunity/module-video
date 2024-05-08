// noinspection JSUnusedGlobalSymbols

define([
  'video/uiAbstract'
], function (uiAbstract) {
  'use strict';

  /**
   * Preview video for Magento player
   */
  return uiAbstract.extend({
    defaults: {
      template: 'Qunity_Video/video/preview',
      displayArea: 'preview',
      modules: {
        parent: '${ $.parentName }',
        bigPlayButton: '${ $.components.bigPlayButton }',
        posterImage: '${ $.components.posterImage }'
      },
      animationClass: '_animate',
      wrapperSelector: '[data-role="video"]'
    },

    /**
     * Initializes subscription properties
     * @public
     *
     * @return {uiComponent}
     */
    initSubscriber: function () {
      this._super();
      this.element.subscribe(this._updatePreviewClass.bind(this));

      return this;
    },

    /**
     * Creates video player
     * @public
     */
    createVideoPlayer: function () {
      this._destroyElement();

      this.parent().initVideoPlayer();
      this.parent().createVideoPlayer();
    },

    /**
     * Get registered components
     * @public
     *
     * @return {uiComponent[]}
     */
    getComponents: function () {
      return [
        this.components.topBar,
        this.components.bigPlayButton,
        this.components.posterImage,
        this.components.errorInfo,
      ];
    },

    /**
     * Destroy preview video element
     * @private
     */
    _destroyElement: function () {
      const element = this.element(),
        wrapperElement = element.closest(this.wrapperSelector),
        fnEndDestroyProcess = () => {
          element.remove();
          wrapperElement.classList.remove(this.animationClass);
        };

      wrapperElement.classList.add(this.animationClass);
      element.classList.add(this.animationClass);

      this.bigPlayButton().active.valueHasMutated();
      this.posterImage().animate(fnEndDestroyProcess);
    },

    /**
     * Update HTML classes for preview video
     * @private
     *
     * @param {HTMLElement} element
     */
    _updatePreviewClass: function (element) {
      /** @var {HTMLElement} parentElement */
      const parentElement = this.parent().element();

      /** @var {String} classes */
      const classes = parentElement.className;
      element.classList.add(...classes.split(' '));

      /** @var {HTMLElement} wrapperElement */
      const wrapperElement = element.closest('[data-role="video"]');

      wrapperElement.style['min-width'] = parentElement.style['min-width'];
      wrapperElement.style['min-height'] = parentElement.style['min-height'];
    }
  });
});
