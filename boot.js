const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort(path, { baudRate: 9600 }); // 256000

const parser = new Readline();
port.pipe(parser);

parser.on("data", line => console.log(`> ${line}`));
port.write(1);
