define([
  'video/vjsComponent'
], function (vjsComponent) {
  'use strict';

  /**
   * PosterImage component for VideoJs player
   */
  return function (m2Component) {
    return class PosterImage extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.poster = this.wrapper.info;
      }
    };
  };
});
