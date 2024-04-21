define([
  'videojs/component',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * Big play button component for VideoJs player
   */
  return class BigPlayButton extends vjsComponent { // noinspection JSUnusedGlobalSymbols

    /**
     * @inheritDoc
     */
    _initialize() {
      this.on('click', this._onPlayPauseToggle.bind(this));

      this.paused = ko.observable(null);
      this.paused.subscribe(this._animateSubElements.bind(this));
    }

    /**
     * Process event of toggle play/pause states
     * @private
     */
    _onPlayPauseToggle() {
      const player = this.player();
      if (!player.isReady_) {
        return;
      }

      const tech = player.tech(player.techName_);
      this._callPlayPauseToggle(tech);
    }

    /**
     * Call process of toggle play/pause states
     * @private
     *
     * @param {Object} tech
     */
    _callPlayPauseToggle(tech) {
      const isPaused = tech.paused();
      isPaused ? tech.play() : tech.pause();

      (this.paused() === isPaused)
        ? this.paused.valueHasMutated() : this.paused(isPaused);
    }

    /**
     * Animate sub-buttons HTML elements
     * @private
     *
     * @param {Boolean} paused
     */
    _animateSubElements(paused) {
      const type = paused ? 'play' : 'pause';

      (this.wrapper.active() === type) ?
        this.wrapper.active.valueHasMutated() : this.wrapper.active(type);
    }
  }
});
