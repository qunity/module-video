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
      const element = this.element(), fnRemoveElement = () => {
        !element.children.length ? element.remove() : true;
      };

      element.classList.add('_animate');
      this.bigPlayButton().active.valueHasMutated();
      this.posterImage().animate(fnRemoveElement);

      this.parent().initVideoPlayer();
      this.parent().createVideoPlayer();
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
