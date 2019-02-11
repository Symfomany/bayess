// Import module.
// const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');
const path = require('path');

// Optional parameter intended for debugging.
// The object has to implement a log and warn function.
const logger = console;
const DIRECTORY = `examples-recordings`;
const AudioRecorder = require(`./library`);

// Create an instance.

// Initialize recorder and file stream.
const audioRecorder = new AudioRecorder({
    program: process.platform === `win32` ? `sox` : `rec`,
    silence: 0
}, console);


// Create path to write recordings to.
if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
}

// Create file path with random name.
const fileName = path.join(DIRECTORY, Math.random().toString(36).replace(/[^a-z]+/g, ``).substr(0, 4).concat(`.wav`));
console.log(`Writing new recording file at: `, fileName);

// Create write stream.
const fileStream = fs.createWriteStream(fileName, { encoding: `binary` });
// Start and write to the file.
audioRecorder.start().stream().pipe(fileStream);

// Log information on the following events
audioRecorder.stream().on(`close`, function (code) {
    console.warn(`Recording closed. Exit code: `, code);
});
audioRecorder.stream().on(`end`, function () {
    console.warn(`Recording ended.`);
});
audioRecorder.stream().on(`error`, function () {
    console.warn(`Recording error.`);
});

// rec -b 16 -r 16000 myvoice.wav   gain +10


// Write incoming data out the console.
/*audioRecorder.stream().on('data', function(chunk) {
	console.log(chunk);
});*/

// Keep process alive.
process.stdin.resume();
console.warn(`Press ctrl+c to exit.`);

// Creates and starts the recording process.
// audioRecorder.Start();