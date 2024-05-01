define([
  'video/vjsComponent'
], function (vjsComponent) {
  'use strict';

  /**
   * ErrorInfo component for VideoJs player
   */
  return function (m2Component) {
    return class ErrorInfo extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.critical = this.wrapper.info;
      }
    };
  };
});
