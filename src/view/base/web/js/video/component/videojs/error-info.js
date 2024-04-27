define([
  'video/vjsComponent',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * Error info component for VideoJs player
   */
  return function (m2Component) {
    return class ErrorInfo extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.on('error', this._onErrorProcessing.bind(this));
      }

      /**
       * Process event of error in video player
       * @private
       */
      _onErrorProcessing() {
        this.wrapper.show();
        this.player.off();
      }
    };
  };
});
