// export GOOGLE_APPLICATION_CREDENTIALS="/home/pi/bayess/console.json"


const mic = require('mic'); // requires arecord or sox, see https://www.npmjs.com/package/mic
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

const client = new speech.SpeechClient();
const gpio = require('rpi-gpio')
const bayes = require("bayes");
const dataset = require("./dataset.json");

const gpiop = gpio.promise;
const player = require('play-sound')(opts = {})

const classifier = bayes.fromJson(dataset);



/**
 * Set functions util
 */

capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

extractTxt = str => {
    // Dis à ... sans le que ...
    let regex = /(que|que l'|qui|qu'on|qu').*$/gi;
    let matchObj = str.match(regex);

    if (!matchObj) {
        let regex = /(Dis|Ecris|Envois|Renvois|Ecrire|Dire|Adresse) (à|a|au).*$/i;
        let matchObjTwo = str.match(regex);
        if (matchObjTwo) {
            matchObj = [];
            matchObj[0] = matchObjTwo[0].replace(
                /(Dis à|Ecris à|Envois à|Renvois à)/,
                ""
            );
        }
    }

    if (matchObj) {
        matchObj[0] = matchObj[0].replace(/(que|que l'|qui|qu')/, "");
    }

    return matchObj ? capitalizeFirstLetter(matchObj[0]).trim() : null;
};


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
                    setTimeout(() => {
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
            let category = classifier.categorize(transcription.trim());
            console.log(`Catégorie: ${category}`);

            if (category === "music") {
                player.play('./ramener.mp3', (err) => {
                    if (err) throw err
                })
            }

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
