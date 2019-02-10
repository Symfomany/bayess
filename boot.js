const SerialPort = require("serialport");
const port = new SerialPort("/dev/ttyACM0", { baudRate: 9600 }); // 256000
// port.pipe(parser);
// parser.on("data", line => console.log(`> ${line}`));
port.write("1", err => {
  if (err) {
    return console.log("Error on write: ", err.message);
  }
  console.log("message written");
});

// Open errors will be emitted as an error event
port.on("error", err => {
  console.log("Error: ", err.message);
});

console.log("Send 1 to Arduino");
