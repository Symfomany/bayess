var load = require("audio-loader");
const player = require("play-sound")((opts = {}));
// const stream = require("stream");
// const Speaker = require("speaker");
var play = require("audio-play");

var ac = require("audio-context")();

// let speaker = new Speaker();

// function playAudioFromBuffer(fileContents) {
//   let bufferStream = new stream.PassThrough();
//   bufferStream.end(fileContents);
//   bufferStream.pipe(speaker);
// }
function err(error) {
  console.error("Error:", error);
}

load("https://sample-videos.com/audio/mp3/crowd-cheering.mp3")
  .then(buffer => {
    play(buffer)
    // var sample = player(ac, buffer);
    // sample.start();
  })
  .catch(err);

// load one file
// load("https://sample-videos.com/audio/mp3/crowd-cheering.mp3").then(buffer => {
//   //console.log(buffer); // => <AudioBuffer>
//   player.play(buffer, err => {
//     if (err) console.log(err);
//     playAudioFromBuffer(buffer);
//   });
// });
