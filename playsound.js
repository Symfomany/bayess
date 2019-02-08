var player = require('play-sound')(opts = {})

// $ mplayer foo.mp3 
player.play('./ramener.mp3', (err) => {
    if (err) throw err
})


audio.kill()