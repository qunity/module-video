define([
  'videojs/component',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * Poster image component for VideoJs player
   */
  return class PosterImage extends vjsComponent { // noinspection JSUnusedGlobalSymbols

    /**
     * @inheritDoc
     */
    _initialize(player) {
      player.poster = ko.observable(null);
      player.poster.subscribe(this._updateImage.bind(this));
    }

    /**
     * Update image link
     * @private
     *
     * @param {String} link
     */
    _updateImage(link) {
      this.wrapper.src(link);
    }
  }
});
