"use strict";

var player = document.getElementById('thorPlayerVideo');
if (player.autoplay) {
  setDataLayer('player', 'autoplay', '');
}
player.addEventListener('error', function (event) {
  // Not Working
  setDataLayer('player', 'error', event.target.error);
});
player.addEventListener('play', function (event) {
  setDataLayer('player', 'play', '');
});
player.addEventListener('pause', function (event) {
  setDataLayer('player', 'pause', '');
});
player.addEventListener('ended', function (event) {
  setDataLayer('player', 'complete', '');
});
player.addEventListener('volumechange', function (event) {
  player.muted ? setDataLayer('player', 'muted', '') : setDataLayer('player', 'volume_change', '');
});
player.addEventListener('fullscreenchange', function (event) {
  // Not Working
  // player.fullscreen ? console.log('full screen') : console.log('não full screen')
  player.fullscreen ? setDataLayer('player', 'open_fullscreen', '') : setDataLayer('player', 'close_fullscreen', '');
});
function setDataLayer(video_context, video_action, error_name) {
  var video = document.getElementById('thorPlayerVideo');
  var video_percent = (video.currentTime / video.duration * 100).toFixed(1);
  var video_url = video.currentSrc;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'thorplayer',
    'video_context': video_context,
    'video_action': video_action,
    'video_url': video_url,
    'video_percent': video_percent,
    'error_name': error_name
  });
}