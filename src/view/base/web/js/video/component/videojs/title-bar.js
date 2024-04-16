define([
  'videojs/component',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * Title bar component for VideoJs Player
   */
  return class TitleBar extends vjsComponent { // noinspection JSUnusedGlobalSymbols

    /**
     * @inheritDoc
     */
    _initialize(player) {
      player.title = ko.observable(null);
      player.title.subscribe(this._updateTitle.bind(this));
    }

    /**
     * Update title text content
     * @private
     *
     * @param {String} text
     */
    _updateTitle(text) {
      this.wrapper.title(text);
    }
  };
});
