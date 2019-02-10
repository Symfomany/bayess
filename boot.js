const SerialPort = require("serialport");
const port = new SerialPort("/dev/ttyACM0", { baudRate: 9600 }); // 256000
// port.pipe(parser);
// parser.on("data", line => console.log(`> ${line}`));
port.write("1");
