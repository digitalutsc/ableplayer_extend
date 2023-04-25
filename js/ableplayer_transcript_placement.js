(function ($) {

  Drupal.behaviors.exampleBehavior = {

    attach: function (context, settings) {

      // load the observer only once!
      $('.title').once('load_mutation_observer').each(function () {
        var display_ableplayer_transcript = String(settings.display_ableplayer_transcript);
        var show_timestamp = String(settings.show_timestamp);

        var observer = new MutationObserver(function (mutations, observer) {

          if (display_ableplayer_transcript != "1" && show_timestamp != "1") {
            observer.disconnect();
          }

          // check if transcript toggle exists
          if (jQuery("div.able-button-handler-transcript").length) {
            // display transcript
            if (display_ableplayer_transcript == "1") {
              var toggle = jQuery("div.able-button-handler-transcript");
              if (toggle.hasClass('buttonOff')) {
                toggle.click();
              }

              // adjust the width of the transcript div
              var width = $(".able-player").first().width();
              $(".able-transcript-area").first().css('width', width);
            }

            // if user wants to display timestamp, insert timestamps
            if (show_timestamp == "1") {
              setTimeout(function () { }, 0);
              $(".able-transcript-seekpoint").each(function (i) {
                var start = $(this).attr("data-start");
                $(this).prepend("<i>[" + AblePlayer.prototype.formatSecondsAsColonTime(start) + "]</i>  &nbsp;&nbsp;");
              });
            }

            observer.disconnect();
          }
        });

        // Start observing
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      })

    }
  };

})(jQuery);