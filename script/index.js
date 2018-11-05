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
      $('#homeButton').css("opacity", "1");
      if (elmnt == "#moveDown") {
        $('#moveDown').css("animation", "scrollButtonDown 0.6s ease-out forwards");
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

  // function change z-index to show the wanted picture
  function changeIndex(elmnt) {
    $(document).on('click', elmnt, function() {
      if (elmnt == "#arthur") {
        console.log("arthur");
        $("#arthur").removeClass("background").addClass("foreground");
        $("#arthur").css("z-index", "3");
        $("#flamme").removeClass("foreground").addClass("background");
        $("#flamme").css("z-index", "2");
        $("#tombe").removeClass("foreground").addClass("background");
        $("#tombe").css("z-index", "1");
      } else if (elmnt == "#flamme") {
        console.log("flamme");
        $("#arthur").removeClass("foreground").addClass("background");
        $("#arthur").css("z-index", "2");
        $("#flamme").removeClass("background").addClass("foreground");
        $("#flamme").css("z-index", "3");
        $("#tombe").removeClass("foreground").addClass("background");
        $("#tombe").css("z-index", "1");
      } else if (elmnt == "#tombe") {
        console.log("tombe");
        $("#arthur").removeClass("foreground").addClass("background");
        $("#arthur").css("z-index", "1");
        $("#flamme").removeClass("foreground").addClass("background");
        $("#flamme").css("z-index", "2");
        $("#tombe").removeClass("background").addClass("foreground");
        $("#tombe").css("z-index", "3");
      }
    });
  }

  // function redirection on click
  function goToHomePage(elmnt) {
    $(document).on('click', elmnt, function() {
      location.reload();
    });
  }


  // Up & Down arrow move preview tabSection
  function movePreviewOnClick(elmnt) {
    $(document).on('click', elmnt, function() {
      if (elmnt == "#firstPage .upArrow") {
        $('#selectedPreview > img, #selectedPreview > video').css("animation", "imagesDisappearingUp 0.5s ease-in forwards");
        setTimeout(function() {
          console.log('imageUp');
          currentPreview -= 1;
          nextPreview(currentPreview);
          $('#selectedPreview>img, #selectedPreview > video').css("animation", "imagesAppearingUp 0.5s ease-out forwards");
        }, 500);
      } else if (elmnt == "#firstPage .downArrow") {
        console.log('imageDown');
        $('#selectedPreview>img, #selectedPreview > video').css("animation", "imagesDisappearingDown 0.5s ease-in forwards");
        setTimeout(function() {
          currentPreview += 1;
          nextPreview(currentPreview);
          $('#selectedPreview>img, #selectedPreview > video').css("animation", "imagesAppearingDown 0.5s ease-out forwards");
        }, 500);
      }
      seconds = 0;
    })
  }

  //function calls

  changeIndex("#flamme");
  changeIndex("#arthur");
  changeIndex("#tombe");

  goToHomePage("#homeButton");


  movePreviewOnClick("#firstPage .upArrow");
  movePreviewOnClick("#firstPage .downArrow");

  scrollOnClick(".seeMore");
  scrollOnClick("#moveDown");
  scrollOnClick("#selectedPreview > img");
  scrollOnClick("#selectedPreview > video");


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
    console.log(e);
    if (e < 0) {
      e = nbSection - 1;
    } else if (e >= nbSection) {
      e = 0;
    }
    currentPreview = e;
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
      if (seconds == 3.5) {
        $('#selectedPreview>img, #selectedPreview > video').css("animation", "imagesDisappearingDown 0.5s ease-in forwards");
      } else if (seconds == 4) {
        currentPreview += 1;
        if (currentPreview < nbSection) {
          nextPreview(currentPreview);
          $('#selectedPreview>img, #selectedPreview > video').css("animation", "imagesAppearingDown 0.6s ease-out forwards");
        } else {
          currentPreview = 0;
          nextPreview(currentPreview);
          $('#selectedPreview>img, #selectedPreview > video').css("animation", "imagesAppearingDown 0.6s ease-out forwards");
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