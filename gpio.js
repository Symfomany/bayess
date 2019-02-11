var gpio = require('rpi-gpio')
var gpiop = gpio.promise;


gpiop.setup(8, gpio.DIR_OUT)
    .then(() => {
        gpiop.setup(7, gpio.DIR_OUT)
            .then(() => {
                gpiop.write(7, true)
                gpiop.write(8, true)
                setTimeout(() => gpiop.write(7, false), 3000)
            })
            .catch((err) => {
                console.log('Error: ', err.toString())
            })
    })