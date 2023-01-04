"use strict";

function togglePip() {
  var video = document.querySelector('#thorPlayerVideo');
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    video.requestPictureInPicture();
  }
}
var pipButton = document.querySelector('.pip');
pipButton.addEventListener('click', function () {
  togglePip();
});