"use strict";

var playerDiv = document.querySelector("#thorPlayer");

// get player properties
var videoUrl = playerDiv.dataset.video_url;
var height = playerDiv.dataset.height;
var width = playerDiv.dataset.width;

// make the player
var player = document.createElement("video");
player.id = "thorPlayerVideo";
player.width = width;
player.height = height;
player.controls = true;
player.autoplay = true;
player.muted = true;
player.src = videoUrl;
playerDiv.appendChild(player);