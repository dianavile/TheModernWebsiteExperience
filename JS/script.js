$(function () {
  var scrollAlertClosed = false;
  document.addEventListener("scroll", function (e) {
    var lastKnownScrollPosition = window.scrollY;
    if (lastKnownScrollPosition > 100 && !scrollAlertClosed) {
      scrollAlertClosed = true;
      Swal.fire({
        icon: "info",
        input: "email",
        title: "You scrolled! It seems you are interested in our content!",
        inputLabel: "Leave your email to read more in the future",
        inputPlaceholder: "Enter your email address",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "No, thanks",
      });
    }
  });

  // https://stackoverflow.com/a/19538231/508236
  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "o/";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
    } else {
      Swal.fire({
        icon: "question",
        input: "email",
        inputLabel: "Leave your email so we can better bother you.",
        inputPlaceholder: "Enter your email address",
        title: "It seems you leave the tab?",
        text: "Yeah, I know everything",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "No, thanks",
      });
    }
  });

  $(".cookie-panel__button").on("click", function (next) {
    $(document)
      .queue(function (next) {
        $("#cookie-panel").animate({
          bottom: "-300px",
        });
        next();
      })
      .queue(function () {
        $("#notification-fake-permission").animate({
          top: 0,
        });
      });
  });

  $(".notification-fake-permission__button").on("click", function () {
    $("#notification-fake-permission")
      .animate({
        top: -180,
      })
      .queue(function () {
        $("#notification-real-permission").show();
      });
  });

  $(
    ".notification-real-permission__button, .notification-real-permission__close"
  ).on("click", function () {
    $("#notification-real-permission")
      .hide()
      .queue(function () {
        Swal.fire({
          title: "Subscribe Newsletter",
          input: "email",
          inputLabel: "Your email address",
          inputPlaceholder: "Enter your email address",
          showCloseButton: true,
          showCancelButton: true,
          cancelButtonText: "No, thanks",
        })
          .then(() => {
            return Swal.fire({
              icon: "error",
              title: "Adblock Detected",
            });
          })
          .then(() => {
            $("#membership-panel").animate({
              bottom: 0,
            });
          });
      });
  });

  $(".useless-video__play-button, .useless-video__play-text").on(
    "click",
    function () {
      $(".useless-video__play-button, .useless-video__play-text").hide();
      $(".useless-video__no-play-text").show();
    }
  );

  $(".membership-panel__close, .membership-panel__option button").on(
    "click",
    function () {
      $("#membership-panel")
        .animate({
          bottom: -300,
        })
        .queue(function () {
          $("#overlay-mask")
            .fadeOut(300)
            .queue(function () {
              $(".feedback-icon").show();
              $(".feedback-container").show();

              $(".chat-icon").show();
              $(".chat-container").show();

              $(".discount-banner").show();
              $(".square__ad").show();
              $("#share").show();
              $("#useless-video").css({
                display: "flex",
              });
              $("body").css({
                overflow: "auto",
              });
              $(".horizontal__ad").slick({
                autoplay: true,
                autoplaySpeed: 200,
                pauseOnHover: false,
              });
            });
        });
    }
  );
});
