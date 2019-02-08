const FileWriter = require('wav').FileWriter;
const mic = require('mic'); // requires arecord or sox, see https://www.npmjs.com/package/mic
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient();
const gpio = require('rpi-gpio')
const gpiop = gpio.promise;
// The name of the audio file to transcribe

const micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 1
});

const micInputStream = micInstance.getAudioStream();
const outputFileStream = fs.WriteStream('./output.raw');
micInputStream.pipe(outputFileStream);


micInputStream.on('data', function (data) {
    // console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function (err) {
    // cosole.log("Error in Input Stream: " + err);
});

micInputStream.on('startComplete', function () {

    gpiop.setup(7, gpio.DIR_OUT)
        .then(() => {
            gpiop.write(7, true)
            gpiop.setup(8, gpio.DIR_OUT)
                .then(() => {
                    gpiop.write(8, false)
                    setTimeout(function () {
                        micInstance.stop();
                        gpiop.write(7, false)
                        gpiop.write(8, true)
                    }, 4000);
                })
                .catch((err) => {
                    console.log('Error: ', err.toString())
                })
        })


    // console.log("Got SIGNAL startComplete");

});

micInputStream.on('stopComplete', function () {
    // console.log("Got SIGNAL stopComplete");
    const fileName = './output.raw';
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    const audio = {
        content: audioBytes,
    };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'fr-FR',
    };
    const request = {
        audio: audio,
        config: config,
    };

    // Detects speech in the audio file
    client.recognize(request)
        .then(data => {
            const response = data[0];
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            console.log(`Transcription: ${transcription}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

});


micInputStream.on('silence', function () {
    console.log("Got SIGNAL silence");
});

micInputStream.on('processExitComplete', function () {
    console.log("Got SIGNAL processExitComplete");
});

micInstance.start();
