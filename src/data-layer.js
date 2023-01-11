const player = document.getElementById('thorPlayerVideo')

if(player.autoplay) {
  setDataLayer('player', 'autoplay', '')
}

player.addEventListener('error', (event) => {
  // Not Working
  setDataLayer('player','error', event.target.error)
})

player.addEventListener('play', (event) => {
  setDataLayer('player', 'play', '')
})

player.addEventListener('pause', (event) => {
  setDataLayer('player', 'pause', '')
})

player.addEventListener('ended', (event) => {
  setDataLayer('player', 'complete', '')
})

player.addEventListener('volumechange', (event) => {
  player.muted ? setDataLayer('player', 'muted', '') : setDataLayer('player', 'volume_change', '')
})

player.addEventListener('fullscreenchange', (event) => {
  // Not Working
  // player.fullscreen ? console.log('full screen') : console.log('não full screen')
  player.fullscreen ? setDataLayer('player', 'open_fullscreen', '') : setDataLayer('player', 'close_fullscreen', '')
})

function setDataLayer(video_context, video_action, error_name) {
  const video = document.getElementById('thorPlayerVideo')
  const video_percent = ((video.currentTime / video.duration) * 100).toFixed(1)
  const video_url = video.currentSrc

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event' : 'thorplayer',
    'video_context': video_context,
    'video_action' : video_action,
    'video_url': video_url,
    'video_percent': video_percent,
    'error_name': error_name
  })
}