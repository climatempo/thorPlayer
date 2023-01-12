"use strict";

var makePlayer = function makePlayer() {
  var playerDiv = document.querySelector("#thorPlayer");
  var videoUrl = playerDiv.dataset.video_url;
  var height = playerDiv.dataset.height;
  var width = playerDiv.dataset.width;
  var player = document.createElement("video");
  player.id = "thorPlayerVideo";
  player.classList.add("video-js", "vjs-default-skin", "vjs-big-play-centered");
  playerDiv.style.height = height;
  playerDiv.style.width = width;
  player.width = width;
  player.height = height;
  player.controls = true;
  player.autoplay = true;
  player.muted = true;
  playerDiv.appendChild(player);
  var videoJs = videojs("#thorPlayerVideo");
  videoJs.src(videoUrl);
  videoJs.fluid(true);
};
var initAd = function initAd() {
  var playerDiv = document.querySelector("#thorPlayer");
  var videoJs = videojs("#thorPlayerVideo");
  var adTagUrl = playerDiv.dataset.ad_tag_url + getKeyValues();
  console.log(adTagUrl);
  videoJs.ima({
    id: "thorPlayerVideo",
    vpaidMode: google.ima.ImaSdkSettings.VpaidMode.INSECURE,
    adTagUrl: adTagUrl,
    playAdAlways: true
  });
};
var setAllDataLayers = function setAllDataLayers() {
  var videoJs = videojs("#thorPlayerVideo");
  var player = document.querySelector("#thorPlayerVideo");
  if (player.autoplay) {
    setDataLayer('player', 'autoplay', '');
  }
  videoJs.on("adserror", function (err) {
    setDataLayer('ads', 'ads_error', err.message);
  });
  videoJs.on('error', function () {
    setDataLayer('player', 'error', "".concat(this.error().message));
  });
  videoJs.on('ads-manager', function (response) {
    setDataLayer('ads', 'ads_manager', '');
  });
  videoJs.on('ads-ad-started', function (response) {
    setDataLayer('ads', 'ads_ad_started', '');
  });
  videoJs.on('CONTENT_PAUSE_REQUESTED', function (event) {
    setDataLayer('ads', 'content_pause_request', '');
  });
  videoJs.on('play', function (response) {
    setDataLayer('player', 'play', '');
  });
  videoJs.on('pause', function (response) {
    setDataLayer('player', 'pause', '');
  });
  videoJs.on('ended', function (response) {
    setDataLayer('player', 'complete', '');
  });
  videoJs.on('volumechange', function (response) {
    if (videoJs.muted()) {
      setDataLayer('player', 'muted', '');
    }
    setDataLayer('player', 'volume_change', '');
  });
  videoJs.on('fullscreenchange', function (response) {
    if (videoJs.isFullscreen()) {
      setDataLayer('player', 'open_fullscreen', '');
    } else {
      setDataLayer('player', 'close_fullscreen', '');
    }
  });
};
var getKeyValues = function getKeyValues() {
  var playerDiv = document.querySelector("#thorPlayer");
  var keys = JSON.parse('[' + playerDiv.dataset.key_values.replace(/'/g, '"') + ']');
  keys = keys[0];
  var custParams = '&cust_params=';
  keys.forEach(function (key) {
    if (getMetaTag(key) != null && getMetaTag(key) != '' && getMetaTag(key) != 'null') {
      custParams += "".concat(key, "%3D").concat(getMetaTag(key), "%26").replace(/\s/g, '');
    }
  });
  return custParams;
};
function setDataLayer(video_context, video_action, error_name) {
  var video = videojs("#thorPlayerVideo");
  var video_url = video.currentSrc();
  var video_percent = (video.currentTime() / video.duration() * 100).toFixed(1);
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
function getMetaTag(name) {
  var element = document.querySelector('meta[name="' + name + '"]');
  var content = element && element.getAttribute("content");
  return removeSeats(content);
}
function removeSeats(text) {
  text = String(text).toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  text = text.replace(/\s/g, '');
  text = text.replace('-', '');
  return text;
}
makePlayer();
initAd();
// faltam 2 data layers do picture in picture
setAllDataLayers();