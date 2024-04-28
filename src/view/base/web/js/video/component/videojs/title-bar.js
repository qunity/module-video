define([
  'video/vjsComponent'
], function (vjsComponent) {
  'use strict';

  /**
   * TitleBar component for VideoJs player
   */
  return function (m2Component) {
    return class TitleBar extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.title = this.wrapper.title;
      }
    };
  };
});
