// noinspection JSUnusedGlobalSymbols

define([
  'video/uiAbstract'
], function (uiAbstract) {
  'use strict';

  /**
   * Preview video component for Magento player
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
      wrapperSelector: '.video-wrapper[data-role="video"]'
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
      this.element.subscribe(this._updateWrapperStyle.bind(this));

      return this;
    },

    /**
     * Creates video player
     * @public
     */
    createVideoPlayer: function () {
      this._destroyElement();
      this.parent().initVideoPlayer().createVideoPlayer();
    },

    /**
     * Get registered components in preview video component
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
     * Update HTML classes of preview video element
     * @private
     *
     * @param {HTMLElement} element
     */
    _updatePreviewClass: function (element) {
      /** @var {HTMLElement} videoElement */
      const videoElement = this.parent().element();

      /** @var {String} classes */
      const classes = videoElement.className;
      element.classList.add(...classes.split(' '));
    },

    /**
     * Update HTML styles of wrapper video element
     * @private
     *
     * @param {HTMLElement} element
     */
    _updateWrapperStyle: function (element) {
      /** @var {HTMLElement} wrapperElement */
      const wrapperElement = element.closest(this.wrapperSelector);

      /** @var {Object} options */
      const options = this.parent().options;

      wrapperElement.style['min-width'] = `${options.width}px`;
      wrapperElement.style['min-height'] = `${options.height}px`;
    }
  });
});
