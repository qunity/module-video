define([
  'video/m2Component',
  'video/vjsComponent'
], function (m2Component, vjsTopBar) {
  'use strict';

  /**
   * TopBar UI component for Magento video player
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
      this.observe(['title', 'description']);

      return this;
    }
  });
});
