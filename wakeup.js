const player = require("play-sound")((opts = {}));
const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

player.play("./wakeup.wav", err => {
  if (err) throw err;
});

gpiop.setup(7, gpio.DIR_OUT).then(() => {
  gpiop.write(7, true);

  setTimeout(() => gpiop.write(7, false), 5000);
});
