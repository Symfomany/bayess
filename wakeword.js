const Wakeword = require('wakeword');

// Disable log output
Wakeword.logFile = '/dev/null';

function listen() {
    Wakeword.listen(['hello', 'goodbye'], 0.87, (data, word) => {
        console.log(word);

        if (word !== 'goodbye') {
            Wakeword.resume();
        } else {
            Wakeword.stop();
        }
    });
}

listen();