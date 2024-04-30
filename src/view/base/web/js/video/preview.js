// noinspection JSUnusedGlobalSymbols

define([
  'video/uiAbstract'
], function (uiAbstract) {
  'use strict';

  /**
   * Preview Magento Video player
   */
  return uiAbstract.extend({
    defaults: {
      template: 'Qunity_Video/video/preview',
      displayArea: 'preview',
      modules: {
        parent: '${ $.parentName }',
        player: '${ $.parentName }.player',
        bigPlayButton: '${ $.components.bigPlayButton }',
        posterImage: '${ $.components.posterImage }'
      }
    },

    /**
     * Initializes subscription properties
     * @public
     *
     * @returns {uiComponent}
     */
    initSubscriber: function () {
      this._super();
      this.element.subscribe(this._updatePreviewClass.bind(this));

      return this;
    },

    /**
     * Create Video player
     * @public
     */
    createVideoPlayer: function () {
      /** @var {HTMLElement} element */
      const element = this.element();

      element.classList.add('_animate');
      this.bigPlayButton().active.valueHasMutated();

      this.player().init();
      this.posterImage().animate('init', () => {

        this.player().create();
        this.posterImage().animate('create', () => element.remove());
      });
    },

    /**
     * Get registered components
     * @public
     *
     * @returns {uiComponent[]}
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
     * Update HTML classes for Preview Video
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
