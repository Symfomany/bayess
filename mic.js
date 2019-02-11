// export GOOGLE_APPLICATION_CREDENTIALS="/home/pi/bayess/console.json"

const mic = require("mic"); // requires arecord or sox, see https://www.npmjs.com/package/mic
// Imports the Google Cloud client library
const speech = require("@google-cloud/speech");
const fs = require("fs");
const contacts = require("./contacts.json");

const client = new speech.SpeechClient();
const gpio = require("rpi-gpio");
const gpiop = gpio.promise;

const bayes = require("bayes");
const dataset = require("./dataset.json");

const player = require("play-sound")((opts = {}));

const classifier = bayes.fromJson(dataset);
const spawn = require("child_process").spawn;

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

let extractName = phrase => {
  let regex = new RegExp(`${phrase}`, "ig");

  let resultat = null;
  contacts.forEach(name => {
    if (regex.test(name) == true) {
      resultat = name;
    }
  });

  return resultat;
};

let extractMusic = phrase => {
  let regexTrack = new RegExp(`/(?:la musique|la chanson|L'extrait de)/`, "ig");
  let regexTrackComplete = new RegExp(
    `/(?:la musique|la chanson|L'extrait de).*/`,
    "ig"
  );

  let regexAlbum = new RegExp(
    `/(?:L'album|la bof|une chanson de|la playlist|du cd).*/`,
    "ig"
  );

  let regexChanteurCompositeur = new RegExp(
    "(?:Le chanteur|la chanteuse|la musique de|une chanson de|une musique de|les musiques de|la playlist de|les chansons de|un son de)",
    "ig"
  );
  let regexChanteurCompositeurComplete = new RegExp(
    `${regexChanteurCompositeur}.*`,
    "gi"
  );

  const resOne = phrase.match(regexChanteurCompositeurComplete);
  const resTwo = phrase.match(regexTrackComplete);

  if (resTwo && resTwo.length > 0) {
    return resTwo[0].replace(regexTrack, "").trim();
  }

  if (resOne && resOne.length > 0) {
    return resOne[0].replace(regexChanteurCompositeur, "").trim();
  }
  return null;
};

const micInstance = mic({
  rate: "16000",
  channels: "1",
  debug: true,
  exitOnSilence: 1
});

const micInputStream = micInstance.getAudioStream();
const outputFileStream = fs.WriteStream("./output.raw");
micInputStream.pipe(outputFileStream);

micInputStream.on("data", function(data) {
  // console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on("error", function(err) {
  // cosole.log("Error in Input Stream: " + err);
});

micInputStream.on("startComplete", function() {
  spawn("python", ["/home/pi/pixel_ring/examples/respeaker_4mic_array.py"]);

  gpiop.setup(7, gpio.DIR_OUT).then(() => {
    gpiop.write(7, true);
    gpiop
      .setup(8, gpio.DIR_OUT)
      .then(() => {
        gpiop.write(8, false);
        setTimeout(() => {
          micInstance.stop();
          gpiop.write(7, false);
          gpiop.write(8, true);
        }, 5000);
      })
      .catch(err => {
        console.log("Error: ", err.toString());
      });
  });

  // console.log("Got SIGNAL startComplete");
});

micInputStream.on("stopComplete", function() {
  // console.log("Got SIGNAL stopComplete");
  const fileName = "./output.raw";
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString("base64");
  const audio = {
    content: audioBytes
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "fr-FR"
  };
  const request = {
    audio: audio,
    config: config
  };

  // Detects speech in the audio file
  client
    .recognize(request)
    .then(data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      console.log(`Transcription: ${transcription}`);
      let category = classifier.categorize(transcription.trim());
      console.log(`Catégorie: ${category}`);

      if (category === "music") {
        player.play("./ramener.mp3", err => {
          if (err) throw err;
        });
      }
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
});

micInputStream.on("silence", function() {
  // console.log("Got SIGNAL silence");
});

micInputStream.on("processExitComplete", function() {
  // console.log("Got SIGNAL processExitComplete");
});

micInstance.start();
