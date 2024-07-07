define([
  'video/m2Component',
  'video/vjsComponent'
], function (m2Component, vjsSpinner) {
  'use strict';

  /**
   * Spinner UI component for Magento video player
   */
  return m2Component.extend({
    defaults: {
      videojsComponent: vjsSpinner,
      template: 'Qunity_Video/video/component/spinner'
    }
  });
});
