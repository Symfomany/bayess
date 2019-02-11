const player = require("play-sound")((opts = {}));

// $ mplayer foo.mp3
// player.play("./ramener.mp3", err => {
//   if (err) throw err;
// });
// player.play("./ramener.mp3", {
//   afplay: ["-v", 0.5, "-t", 5]
// });

// setTimeout(() => player.stop(), 2000);
// player.play("./beep.mp3");

const player = Player([
  __dirname + "/beep.mp3",
  __dirname + "/beep.mp3",
  __dirname + "/beep.mp3",
  // play .mp3 file from a URL
  "http://mr4.douban.com/blablablabla/p1949332.mp3"
]);

// const audio = player.play("./ramener.mp3", function(err) {
//   if (err && !err.killed) throw err;
// });

// const audioTwo = player.play("./ramenerTwo.mp3", function(err) {
//   if (err && !err.killed) throw err;
// });

// audio.kill();
