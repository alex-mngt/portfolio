/* global window, document */
/* eslint-env es6 */
/* jshint esversion: 6 */

window.onload = function() {
  "use strict";

  let currentMemorial = 0;
  let tabMemorial = document.querySelectorAll("img");

  function memorialPictures(elmnt) {
    $(document).on('click', elmnt, function() {
      if (elmnt == "#memorialLeftArrow") {
        console.log("left_arrow");
        $(".displayedMemorial").css("animation", "fadeOut .5s ease-out");
        currentMemorial += 1;
        if (currentMemorial > 2) {
          currentMemorial = 0;
        }
        setTimeout(function() {
          // console.log(currentMemorial);
          $(".displayedMemorial").removeClass("displayedMemorial");
          tabMemorial[currentMemorial].classList.add("displayedMemorial");
          $(".displayedMemorial").css("animation", "fadeIn .5s ease-out");
        }, 500);
      } else if (elmnt == "#memorialRightArrow") {
        console.log("right_arrow");
        $(".displayedMemorial").css("animation", "fadeOut .5s ease-out");
        currentMemorial -= 1;
        if (currentMemorial < 0) {
          currentMemorial = 2;
        }
        setTimeout(function() {
          // console.log(currentMemorial);
          $(".displayedMemorial").removeClass("displayedMemorial");
          tabMemorial[currentMemorial].classList.add("displayedMemorial");
          $(".displayedMemorial").css("animation", "fadeIn .5s ease-out");
        }, 500);
      }
    });
  }

  // function redirection on click
  function goToHomePage(elmnt) {
    $(document).on('click', elmnt, function() {
      location.reload();
    });
  }

  // function calls
  memorialPictures("#memorialLeftArrow");
  memorialPictures("#memorialRightArrow");

  goToHomePage("#homeButton");

}