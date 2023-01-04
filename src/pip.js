function togglePip() {
  const video = document.querySelector('#thorPlayerVideo');
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    video.requestPictureInPicture();
  }
}

const pipButton = document.querySelector('.pip')

pipButton.addEventListener('click', () => {
  togglePip()
})