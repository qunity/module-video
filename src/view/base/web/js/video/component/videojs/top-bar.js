define([
  'video/vjsComponent'
], function (vjsComponent) {
  'use strict';

  /**
   * TopBar component for VideoJs player
   */
  return function (m2Component) {
    return class TopBar extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.info = this.wrapper.info;
      }
    };
  };
});
