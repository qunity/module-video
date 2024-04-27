define([
  'video/vjsComponent',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * Title bar component for VideoJs player
   */
  return function (m2Component) {
    return class TitleBar extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.title = ko.observable(null);
        player.title.subscribe(this._updateTitle.bind(this));
      }

      /**
       * Update title text content in HTML element
       * @private
       *
       * @param {String} text
       */
      _updateTitle(text) {
        this.wrapper.title(text);
      }
    };
  };
});
