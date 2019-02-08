var gpio = require('rpi-gpio')
var gpiop = gpio.promise;

gpiop.setup(7, gpio.DIR_OUT)
    .then(() => {
        gpiop.write(7, false)
        setTimeout(() => gpiop.write(7, true), 3000)
        setTimeout(() => gpiop.write(7, false), 6000)

    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })