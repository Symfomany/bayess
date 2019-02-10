const player = require("play-sound")((opts = {}));
const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

player.play("./wakeup.wav", err => {
  if (err) throw err;
});

console.log("Playing music");

// var gpio = require("gpio");
// var gpio7, intervalTimer;
var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, "out"); //use GPIO pin 4, and specify that it is output
var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

function blinkLED() {
  //function to start blinking
  if (LED.readSync() === 0) {
    //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function endBlink() {
  //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds
// gpiop.setup(7, gpio.DIR_OUT).then(() => {
//   gpiop.write(7, true);
//   let intervalFunc = () => gpiop.write(7, true);
//   let intervalFuncTwo = () => gpiop.write(7, false);

//   setInterval(intervalFunc, 1500);
//   setInterval(intervalFuncTwo, 2000);

//   console.log("Go GPIO");

//   setTimeout(() => gpiop.write(7, false), 7000);
// });
