define([
  'video/vjsComponent',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * Poster image component for VideoJs player
   */
  return function (m2Component) {
    return class PosterImage extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize(player) {
        player.poster = ko.observable(null);
        player.poster.subscribe(this._updateImage.bind(this));
      }

      /**
       * Update image link in HTML element
       * @private
       *
       * @param {String} link
       */
      _updateImage(link) {
        this.wrapper.src(link);
      }
    };
  };
});
