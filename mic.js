var FileWriter = require('wav').FileWriter;
var mic = require('mic'); // requires arecord or sox, see https://www.npmjs.com/package/mic
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient();

// The name of the audio file to transcribe



var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 1
});

var micInputStream = micInstance.getAudioStream();
var outputFileStream = fs.WriteStream('./output.raw');
micInputStream.pipe(outputFileStream);


micInputStream.on('data', function (data) {
    console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function (err) {
    cosole.log("Error in Input Stream: " + err);
});

micInputStream.on('startComplete', function () {
    console.log("Got SIGNAL startComplete");
    setTimeout(function () {
        micInstance.stop();


    }, 4000);
});

micInputStream.on('stopComplete', function () {
    console.log("Got SIGNAL stopComplete");

    const fileName = './output.raw';

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
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
