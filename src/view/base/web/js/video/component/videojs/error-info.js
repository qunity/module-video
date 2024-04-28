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
        player.on('error', this._onErrorProcessing.bind(this));
        player.critical = this.wrapper.info;
      }

      /**
       * Process event of error in video player
       * @private
       */
      _onErrorProcessing() {
        this.wrapper.info.valueHasMutated();
        this.player().off();
      }
    };
  };
});
