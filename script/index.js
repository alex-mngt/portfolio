/* global window, document */
/* eslint-env es6 */
/* jshint esversion: 6 */

window.onload = function() {
  "use strict";
  // variables
  let firstPage = true;
  let currentPreview = 0;
  let seconds = 0;
  let nbSection = $("section:nth-of-type(n+2)").length;

  // storage tables
  let tabPreview = document.querySelectorAll("section:first-of-type>article");
  let tabSection = document.querySelectorAll("body>main>section:nth-of-type(n+2)");

  //adding scroll down action
  function scrollOnClick(elmnt) {
    $(document).on('click', elmnt, function() {
      if (elmnt == "#moveDown") {
        $('#moveDown').css("animation", "scrollButtonDown 0.6s ease-out forwards");
        $('#homeButton').css("opacity", "1");
      }
      setTimeout(function() {
        fullpage_api.moveSectionDown();
        firstPage = false;
        setTimeout(function() {
          fullpage_api.destroy("all");
          $('section:first-of-type').css("display", "none");
          $('#fullpage').removeAttr("id");
          $('.selectedSection').attr("id", "fullpage");
          new fullpage('#fullpage', {
            //options here
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            fixedElements: '#header'
          });
          $('section:not(#fullpage)').css("display", "none");
        }, 1000);
      }, 250);
    });
  }

  // function redirection on click
  function goToHomePage(elmnt) {
    $(document).on('click', elmnt, function() {
      location.reload();
    });
  }

  goToHomePage("#homeButton");

  // Up & Down arrow move preview tabSection
  function movePreviewOnClick(elmnt) {
    $(document).on('click', elmnt, function() {
      if (elmnt == "#upArrow") {
        console.log('imageUp');
        $('#selectedPreview > img').css("animation", "imagesDisappearingUp 0.5s ease-in forwards");
        setTimeout(function() {
          currentPreview += 1;
          moveSelectedPreview(currentPreview);
          $('#selectedPreview>img').css("animation", "imagesAppearingUp 0.5s ease-out forwards");
        }, 500);
      } else if (elmnt == "#downArrow") {
        console.log('imageDown');
        $('#selectedPreview>img').css("animation", "imagesDisappearingDown 0.5s ease-in forwards");
        setTimeout(function() {
          currentPreview -= 1;
          moveSelectedPreview(currentPreview);
          $('#selectedPreview>img').css("animation", "imagesAppearingDown 0.5s ease-out forwards");
        }, 500);
      }
      seconds = 0;
    })
  }

  movePreviewOnClick("#upArrow");
  movePreviewOnClick("#downArrow");

  scrollOnClick(".seeMore");
  scrollOnClick("#moveDown");
  scrollOnClick("#selectedPreview > img");

  // functions

  function moveSelectedPreview(e) {
    if (e < 0) {
      e = nbSection - 1;
    } else if (e >= nbSection) {
      e = 0;
    }
    currentPreview = e;
    $("#selectedPreview").removeAttr("id");
    tabPreview[e].setAttribute("id", "selectedPreview");
  }

  function moveSelectedSection(e) {
    $(".selectedSection").removeClass("selectedSection section fp-section");
    tabSection[e].setAttribute("class", "section selectedSection fp-section");
  }

  function nextPreview(e) {
    moveSelectedPreview(e);
    moveSelectedSection(e);
  }

  // Automatic tasks
  setInterval(function() {
    if (firstPage) {
      seconds += 0.5;
      console.log(seconds);
      if (seconds == 3.5) {
        $('#selectedPreview>img').css("animation", "imagesDisappearingDown 0.5s ease-in forwards");
      } else if (seconds == 4) {
        currentPreview += 1;
        if (currentPreview < nbSection) {
          nextPreview(currentPreview);
          $('#selectedPreview>img').css("animation", "imagesAppearingDown 0.6s ease-out forwards");
        } else {
          currentPreview = 0;
          nextPreview(currentPreview);
          $('#selectedPreview>img').css("animation", "imagesAppearingDown 0.6s ease-out forwards");
        }
        seconds = 0;
      }
    }
  }, 500);

  // disable/enable scroll functions
  var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
  }

  function enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }

  disableScroll();

}