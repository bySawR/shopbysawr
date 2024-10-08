    (function ($) {
      var isInternetExplorer;
      $.fn.typePlaceholder = function (option) {
        isInternetExplorer = navigator.appName == "Microsoft Internet Explorer";
        var opt = $.extend(
          {
            speed: 100,
            delay: 1000,
            keywords: ["keywords"],
          },
          option || {}
        );
        if (typeof opt.keywords == "string") {
          opt.keywords = [opt.keywords];
        }
        return this.each(function () {
          var input = $(this);
          var inputElement = input.get(0);
          var keywordsIndex, inputIndex, keywords;
          function st() {
            keywordsIndex = inputIndex = 0;
            keywords = opt.keywords[keywordsIndex];
            input.show();
            typeWriting();
          }
          input.focus(function () {
            if (!isInternetExplorer) {
              $(input).attr("placeholder", "");
            } else {
              input.val("");
            }
            var typeWritingInput = $.data(inputElement, "type-placeholder-input");
            if (typeWritingInput) {
              clearTimeout(typeWritingInput);
              $.data(inputElement, "type-placeholder-input", false);
            } else {
              $(this).select();
            }
          });
          input.blur(function () {
            if (input.val() == "") {
              st();
            }
          });
          function typeWriting() {
            if (!isInternetExplorer) {
              $(input).attr("placeholder", keywords.substring(0, inputIndex++) + "|");
            } else {
              input.val(keywords.substring(0, inputIndex++) + "|");
            }
            if (inputIndex > keywords.length) {
              $.data(
                inputElement,
                "type-placeholder-input",
                setTimeout(function () {
                  if (++keywordsIndex >= opt.keywords.length) {
                    keywordsIndex = 0;
                  }
                  keywords = opt.keywords[keywordsIndex];
                  inputIndex = 0;
                  typeWriting();
                }, opt.delay)
              );
            } else {
              $.data(inputElement, "type-placeholder-input", setTimeout(typeWriting, opt.speed));
            }
          }
          if (!input.val()) {
            st();
          }
        });
      };

$('#live-search-input').typePlaceholder({
    keywords: [
    'What do you need to save time?',
    'Intervention, DSR50 or L96A1 Screenshot Pack?',
    'Controller Screenshot Pack, Renders/PNGs or Layer Styles?',
    'Thumbnail, Subtitle Pack or Emotes?',
    'Preset Pack, Sound Effect Pack or Animation?',
    'Kick Follow Tag, Bundles or Transitions?',
    'Logo Render Pack, Tier List or Character Render?',
    'Call Of Duty, Headshot Render or Rust?',
    'Ray Gun, Map Screenshot Pack or Callsign Template?'
  ],
      speed: 40,
      delay: 1000,
    });

    })(jQuery);
