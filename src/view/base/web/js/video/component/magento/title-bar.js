define([
  'video/m2Component',
  'video/vjsTitleBar'
], function (m2Component, vjsTitleBar) {
  'use strict';

  /**
   * Title bar UI component for Magento Video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsTitleBar,
      template: 'Qunity_Video/video/component/title-bar',
      imports: {
        title: '${ $.name }:options.title'
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
      this.observe(['title']);

      return this;
    }
  });
});
