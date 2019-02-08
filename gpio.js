var gpio = require('rpi-gpio')
var gpiop = gpio.promise;
gpio.setup(7, gpio.DIR_OUT);
gpiop.setup(8, gpio.DIR_OUT);

gpiop.write(7, true)
gpiop.write(8, true)

gpio.on('export', function (channel) {
    console.log('Channel set: ' + channel);
});


    //     gpiop.write(7, false)
    //     gpiop.write(8, true)
    //     setTimeout(() => gpiop.write(7, true), 1000)
    // })
    // .catch((err) => {
    //     console.log('Error: ', err.toString())
    // })