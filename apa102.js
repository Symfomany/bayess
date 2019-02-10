// var Apa102spi = require("apa102-spi");

// setTimeout(() => {
//   // Apa102spi(number of leds, clock divider)
//   var LedDriver = new Apa102spi(9, 100);

//   // setLedColor(n, brightness 0-31, red 0-255, green 0-255, blue 0-255) , n=0 led1; n=1, led2; n=2, led3;
//   LedDriver.setLedColor(0, 1, 255, 0, 0);

//   // send data to led string
//   LedDriver.sendLeds();
// }, 2000);

//

const spawn = require("child_process").spawn;
const pythonProcess = spawn("python", [
  "/home/pi/pixel_ring/respeaker_4mic_array.py"
]);
pythonProcess.stdout.on("data", data => {
  // Do something with the data returned from python script
});

setTimeout(() => {}, 10000);
