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

        player.error = ko.observable(null);
        player.error.subscribe(this._showErrorInfo.bind(this));
      }

      /**
       * Process event of error in video player
       * @private
       */
      _onErrorProcessing() {
        this._showErrorInfo();
        this.player.off();
      }

      /**
       * Show error information into HTML element
       *
       * @param {String|null} message
       * @private
       */
      _showErrorInfo(message = null) {
        this.wrapper.show(message);
      }
    };
  };
});
