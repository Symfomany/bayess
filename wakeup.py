"""
Control pixel ring on ReSpeaker 4 Mic Array

pip install pixel_ring gpiozero
"""

import time

from pixel_ring import pixel_ring
from gpiozero import LED

power = LED(5)
power.on()

pixel_ring.set_brightness(100)

if __name__ == '__main__':
    pixel_ring.wakeup()
    time.sleep(1)
    pixel_ring.speak()
    time.sleep(10)
    pixel_ring.off()
power.off()
