/**
 * Client ID 63a5a6987be44503b1dfd4afe346fe15
Client Secret 67620db34cfe46caaf2987a0d717c4ee

https://developer.spotify.com/dashboard/applications/63a5a6987be44503b1dfd4afe346fe15
 */
const SpotifyPlayer = require('./spotify-player.js')
var spotifyPlayer = new SpotifyPlayer();


spotifyPlayer.on('update', response => {
    // response is a json object obtained as a response of
    // https://developer.spotify.com/web-api/get-information-about-the-users-current-playback/
});

spotifyPlayer.on('login', user => {
    if (user === null) {
        // there is no user logged in or the user was logged out
        console.log('nulllll')
    } else {
        console.log("connectéééé");

        console.log(user)

        // the user is logged in
        // user is a json object obtained as a response of
        // https://developer.spotify.com/web-api/get-current-users-profile/
    }
});

loginButton.addEventListener('click', () => {
    spotifyPlayer.login();
});

logoutButton.addEventListener('click', () => {
    spotifyPlayer.logout();
});

spotifyPlayer.init();


// function searchAndPlaySong(search_query) {
//     return searchOnSpotify(search_query).then(results => {
//         if (results.length > 0) {
//             return playSong(results[0].spotify_uri);
//         }
//     });
// }


// async function searchAndPlayFirstSong(search_query) {
//     let results = await searchOnSpotify(search_query);
//     if (results.length === 0) return;
//     return playSong(results[0].spotify_uri);
// }

// async function waitForSpotifyWebPlaybackSDKToLoad() {
//     return new Promise(resolve => {
//         if (window.Spotify) {
//             resolve(window.Spotify);
//         } else {
//             window.onSpotifyWebPlaybackSDKReady = () => {
//                 resolve(window.Spotify);
//             };
//         }
//     });
// };

// (async () => {
//     const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
//     console.log("The Web Playback SDK has loaded.");
// })();