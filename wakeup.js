const player = require("play-sound")((opts = {}));
const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

player.play("./wakeup.wav", err => {
  if (err) throw err;
});

console.log("Playing music");

gpiop.setup(7, gpio.DIR_OUT).then(() => {
  gpiop.write(7, true);
  let intervalFunc = () => gpiop.write(7, true);
  let intervalFuncTwo = () => gpiop.write(7, false);

  setInterval(intervalFunc, 1500);
  setInterval(intervalFuncTwo, 2000);

  console.log("Go GPIO");

  setTimeout(() => gpiop.write(7, false), 7000);
});
