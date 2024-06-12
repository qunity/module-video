// noinspection JSDeprecatedSymbols

define([
  'jquery',
  'underscore',
  'uiRegistry',
  'Magento_Ui/js/lib/validation/utils'
], function ($, _, uiRegistry, utils) {
  'use strict';

  /**
   * Caches for results of validation functions
   * @type {{validateYoutubeUrl:Object,validateMetadataYoutubeVideo:Object}}
   */
  let cache = {
    validateYoutubeUrl: {},
    validateMetadataYoutubeVideo: {},
  };

  /**
   * Strips whitespace from beginning and end of string
   * @private
   *
   * @param {String} value
   * @return {String}
   */
  function _trim(value) {
    return value.replace(/^\s+/, '')
      .replace(/\s+$/, '');
  }

  /**
   * Validates provided URL be YouTube URL
   * @private
   *
   * @param {String} url
   * @return {Boolean}
   */
  function _validateYoutubeUrl(url) {
    if (utils.isEmptyNoTrim(url)) {
      return true;
    }

    url = _trim(url || '');
    if (cache.validateYoutubeUrl.hasOwnProperty(url)) {
      return cache.validateYoutubeUrl[url];
    }

    const validateUrl = this.getRule('validate-url');
    let validateResult = validateUrl.handler(url) &&
      url.match(/youtube\.com|youtu\.be/);

    cache.validateYoutubeUrl[url] = validateResult;

    return validateResult;
  }

  /**
   * Validates whether metadata can be retrieved for YouTube video for URL
   * @private
   *
   * @param {String} url
   * @return {Boolean}
   */
  function _validateMetadataYoutubeVideo(url) {
    if (utils.isEmptyNoTrim(url)) {
      return true;
    }

    url = _trim(url || '');
    if (cache.validateMetadataYoutubeVideo.hasOwnProperty(url)) {
      return cache.validateMetadataYoutubeVideo[url];
    }

    const backendUrl = uiRegistry.get('backendUrl');
    let validateResult = false;

    $.ajax({
      url: backendUrl.get('validate-youtube-video-metadata'),
      async: false,
      cache: true,
      data: { videoUrl: url },
      type: 'POST',
      dataType: 'json',
      complete: result => {
        validateResult = result.responseJSON.status;
      }
    });

    cache.validateMetadataYoutubeVideo[url] = validateResult;

    return validateResult;
  }

  /**
   * Add new video verification rules
   * @public
   *
   * @var {Object} validator
   * @return {Object}
   */
  return function (validator) {
    validator.addRule(
      'validate-youtube-url',
      _validateYoutubeUrl.bind(validator),
      $.mage.__('Please enter a valid YouTube video URL.')
    );

    validator.addRule(
      'validate-youtube-video-metadata',
      _validateMetadataYoutubeVideo.bind(validator),
      $.mage.__('Please enter an available metadata YouTube video URL.')
    );

    return validator;
  };
});
