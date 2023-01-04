const playerDiv = document.querySelector("#thorPlayer")

// get player properties
const videoUrl = playerDiv.dataset.video_url
const height = playerDiv.dataset.height
const width = playerDiv.dataset.width

// make the player
const player = document.createElement("video")
player.id = "thorPlayerVideo"
player.width = width
player.height = height
player.controls = false
player.autoplay = true
player.muted = true
player.src = videoUrl
playerDiv.appendChild(player)

//change controls to true when mouse hover over player
document.getElementById('thorPlayerVideo').addEventListener('mouseenter', () => {
  videoContent.controls = true 
})

