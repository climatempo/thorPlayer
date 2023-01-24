const makePlayer = () => {
  console.log('Running Thor Player...')
  const playerDiv = document.querySelector("#thorPlayer")

  const videoUrl = playerDiv.dataset.video_url
  const isYoutube = playerDiv.hasAttribute("youtube")

  const player = document.createElement("video")
  player.id = "thorPlayerVideo"
  player.classList.add("video-js", "vjs-default-skin", "vjs-big-play-centered")

  player.controls = true
  player.autoplay = true
  player.muted = true

  if ((isYoutube)) {
    player.setAttribute('data-setup', `{ 
      "fluid" : true,
      "techOrder": ["youtube"], 
      "sources": [{ 
        "type": "video/youtube", 
        "src": "${videoUrl}"
       }], 
       "youtube": { 
         "iv_load_policy": 1 
       } 
     }`)
  }

  playerDiv.appendChild(player)

  const videoJs = videojs("#thorPlayerVideo")

  if (!isYoutube)
    videoJs.src(videoUrl)

  videoJs.fluid(true)
}


const initAd = () => {
  const playerDiv = document.querySelector("#thorPlayer")
  const videoJs = videojs("#thorPlayerVideo")

  const adTagUrl = playerDiv.dataset.ad_tag_url + getKeyValues()

  videoJs.ima({
    id: "thorPlayerVideo",
    vpaidMode: google.ima.ImaSdkSettings.VpaidMode.INSECURE,
    adTagUrl: adTagUrl,
    playAdAlways: true,
  })
}

const setAllDataLayers = () => {
  const videoJs = videojs("#thorPlayerVideo")
  const player = document.querySelector("#thorPlayerVideo")

  if (player.autoplay) {
    setDataLayer('player', 'autoplay', '')
  }

  videoJs.on("adserror", (err) => {
    setDataLayer('ads', 'ads_error', err.message)
  })

  videoJs.on('error', function () {
    setDataLayer('player', 'error', `${this.error().message}`)
  })

  videoJs.on('ads-manager', function (response) {
    setDataLayer('ads', 'ads_manager', '')
  })

  videoJs.on('ads-ad-started', function (response) {
    setDataLayer('ads', 'ads_ad_started', '')
  })

  videoJs.on('CONTENT_PAUSE_REQUESTED', function (event) {
    setDataLayer('ads', 'content_pause_request', '')
  })

  videoJs.on('play', function (response) {
    setDataLayer('player', 'play', '')
  })

  videoJs.on('pause', function (response) {
    setDataLayer('player', 'pause', '')
  })

  videoJs.on('ended', function (response) {
    setDataLayer('player', 'complete', '')
  })

  videoJs.on('volumechange', function (response) {
    if (videoJs.muted()) {
      setDataLayer('player', 'muted', '')
    }

    setDataLayer('player', 'volume_change', '')
  })

  videoJs.on('fullscreenchange', function (response) {
    if (videoJs.isFullscreen()) {
      setDataLayer('player', 'open_fullscreen', '')
    } else {
      setDataLayer('player', 'close_fullscreen', '')
    }
  })
}

const getKeyValues = () => {
  const playerDiv = document.querySelector("#thorPlayer")
  let keys = JSON.parse('[' + playerDiv.dataset.key_values.replace(/'/g, '"') + ']')
  keys = keys[0]

  let custParams = '&cust_params='
  keys.forEach(key => {
    if (getMetaTag(key) != null && getMetaTag(key) != '' && getMetaTag(key) != 'null') {
      custParams += `${key}%3D${getMetaTag(key)}%26`.replace(/\s/g, '')
    }
  })

  return custParams
}

const setPictureInpicture = () => {
  let pictureInPictureDiv = document.querySelector("#picture-in-picture")
  let playerDiv = document.querySelector("#thorPlayer")
  let isPip = false

  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
      const rect = pictureInPictureDiv.getBoundingClientRect()
      if (rect.top <= 0 && !isPip) {
        playerDiv.classList.add("picture-in-picture")
        isPip = true
        setDataLayer('player', 'open_pip', '')
      } else if (rect.top >= 0 && isPip) {
        playerDiv.classList.remove("picture-in-picture")
        isPip = false
        setDataLayer('player', 'close_pip', '')
      }
    })
  })
}

function setDataLayer(video_context, video_action, error_name) {
  const video = videojs("#thorPlayerVideo")
  const video_url = video.currentSrc()
  const video_percent = ((video.currentTime() / video.duration()) * 100).toFixed(1)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    'event': 'thorplayer',
    'video_context': video_context,
    'video_action': video_action,
    'video_url': video_url,
    'video_percent': video_percent,
    'error_name': error_name
  })
}

function getMetaTag(name) {
  var element = document.querySelector('meta[name="' + name + '"]')
  var content = element && element.getAttribute("content")
  return removeSeats(content)
}

function removeSeats(text) {
  text = String(text).toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
  text = text.replace(/\s/g, '')
  text = text.replace('-', '')
  return text
}

makePlayer()
setPictureInpicture()
initAd()
// faltam 2 data layers do picture in picture
setAllDataLayers()