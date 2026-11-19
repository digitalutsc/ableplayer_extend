/**
 * @file
 * Stops Able Player from speaking a blank utterance when the page loads.
 *
 * While it sets up each player, Able Player calls initSpeech('init'), which
 * speaks " " through the Web Speech API to load the browser's voice list (and
 * does it again on the first click anywhere on the page). Chrome and Edge
 * refuse speechSynthesis.speak() before the user has interacted with the
 * page, so nothing is heard there. Firefox passes the utterance to the
 * system speech engine, which makes an audible blip on every page load.
 *
 * Only the 'init' call is skipped. Able Player calls initSpeech() again with
 * 'play', 'prefs' or 'desc' when the user presses play, opens the
 * preferences, or a description has to be spoken. Each of those follows a
 * user action, so audio description and caption speech still work.
 *
 * This file is appended to the ableplayer/ableplayer library by
 * ableplayer_extend_library_info_alter(), so it runs after ableplayer.min.js
 * and before Able Player creates its players on document ready.
 */
(function (AblePlayer) {
  'use strict';

  if (!AblePlayer || typeof AblePlayer.prototype.initSpeech !== 'function') {
    return;
  }

  var initSpeech = AblePlayer.prototype.initSpeech;

  AblePlayer.prototype.initSpeech = function (context) {
    if (context === 'init') {
      // handlePlay() reads this.synth.paused before it calls
      // initSpeech('play'), so keep a reference to the synthesizer without
      // speaking. speechEnabled stays null, so the later call still runs.
      if (window.speechSynthesis && !this.synth) {
        this.synth = window.speechSynthesis;
      }
      return;
    }
    return initSpeech.apply(this, arguments);
  };
})(window.AblePlayer);
