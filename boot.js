const SerialPort = require("serialport");
const port = new SerialPort("/dev/ttyACM0", { baudRate: 9600 }); // 256000
// port.pipe(parser);
// parser.on("data", line => console.log(`> ${line}`));

console.log("Send 1 to Arduino");

const blinkLED = () => {
  port.write("a");
};
const blinkInterval = setInterval(blinkLED, 5000); //run the blinkLED function every 250ms
const endBlink = () => {
  clearInterval(blinkInterval); // Stop blink intervals
};

setTimeout(endBlink, 20000); //stop blinking after 5 seconds
