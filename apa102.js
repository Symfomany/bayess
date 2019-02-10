var Apa102spi = require("apa102-spi");

// Apa102spi(number of leds, clock divider)
var LedDriver = new Apa102spi(9, 100);

// setLedColor(n, brightness 0-31, red 0-255, green 0-255, blue 0-255)
LedDriver.setLedColor(0, 1, 255, 0, 0);

// send data to led string
LedDriver.sendLeds();
