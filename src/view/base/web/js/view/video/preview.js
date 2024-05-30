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
        bigButton: '${ $.components.bigButton }'
      }
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
      this.bigButton().active.valueHasMutated();
      this.element().classList.add(this.options.htmlClass.creating);

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
        this.components.bigButton,
        this.components.posterImage,
        this.components.errorInfo,
        this.components.spinner,
      ];
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
    }
  });
});
