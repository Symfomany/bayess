// const spotifyApi = new SpotifyWebApi();

const request = require("request");
const player = require("play-sound")((opts = {}));
const play = require("audio-play");

var client_id = "63a5a6987be44503b1dfd4afe346fe15";
var client_secret = "67620db34cfe46caaf2987a0d717c4ee";
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const authOptions = {
      url: "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V",
      headers: {
        Authorization: "Authorization: Bearer " + body.access_token
      },
      json: true
    };

    request.get(authOptions, (error, response, body) => {
      console.log(body.external_urls.spotify);
      play(body.external_urls.spotify)
      // console.log(body);
      // player.play(body.external_urls.spotify, err => {
      //   //   if (err) throw err;
      // });
    });

    console.log({ token: body.access_token });
  }
});
