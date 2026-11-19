# Ableplayer Extend

Extends Drupal Ableplayer module (https://www.drupal.org/project/ableplayer/) with additional configurations. 
* Show transcript by default
* Show timestamp
* No text-to-speech blip on page load in Firefox. Able Player speaks a blank
  utterance to load the browser's voices while it sets up each player. Firefox
  makes that audible, while Chrome and Edge block it. This module skips that
  page-load call (`js/ableplayer_speech_init.js`, added to the
  `ableplayer/ableplayer` library), and speech still starts once the user
  presses play or opens the preferences.

This has been tested with Ableplayer 3.1.0 and Drupal's default olivero theme.  
