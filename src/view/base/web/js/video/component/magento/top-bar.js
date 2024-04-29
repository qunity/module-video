define([
  'video/m2Component',
  'video/vjsTopBar'
], function (m2Component, vjsTopBar) {
  'use strict';

  /**
   * TopBar UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsTopBar,
      template: 'Qunity_Video/video/component/top-bar',
      imports: {
        title: '${ $.name }:options.title',
        description: '${ $.name }:options.description'
      },
      exports: {
        title: '${ $.parentName }.posterImage:alt'
      }
    },

    /**
     * @inheritDoc
     */
    initObservable: function () {
      this._super();
      this.observe(['info', 'title', 'description']);

      return this;
    },

    /**
     * @inheritDoc
     */
    initSubscriber: function () {
      this._super();
      this.info.subscribe(this._setInfo.bind(this));

      return this;
    },

    /**
     * Set top information
     * @private
     *
     * @param {Object|String} info
     */
    _setInfo: function (info) {
      if (info === undefined) {
        this.info({ title: this.title(), description: this.description() });
        return;
      }

      let title = info, description = null;

      if (info && typeof info == 'object') {
        title = info.title ?? null;
        description = info.description ?? null;
      }

      !title ? this.title.valueHasMutated() : this.title(title);
      !description ? this.description.valueHasMutated() : this.description(description);
    }
  });
});
