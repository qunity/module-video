define([
  'video/vjsComponent',
  'ko'
], function (vjsComponent, ko) {
  'use strict';

  /**
   * BigButton component for VideoJs player
   */
  return function (m2Component) {
    return class BigButton extends vjsComponent(m2Component) {

      /**
       * @inheritDoc
       */
      initialize() {
        this.on('click', this._onPlayPauseToggle.bind(this));

        this.paused = ko.observable(null);
        this.paused.subscribe(this._animateElement.bind(this));
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
       * Animate button HTML element
       * @private
       *
       * @param {Boolean} paused
       */
      _animateElement(paused) {
        const type = paused ? 'play' : 'pause';

        (this.wrapper.active() === type) ?
          this.wrapper.active.valueHasMutated() : this.wrapper.active(type);
      }
    };
  };
});
