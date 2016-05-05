# Airlock - Arduino

## Installation

```
npm install cylon cylon-firmata cylon-gpio cylon-i2c cylon-api-http
```

## Loading Firmata Onto Arduino

You need to make sure that the Firmata firmware is loaded onto the Arduino before you run any of this code. You can do this easily using [gort](http://gort.io)

## Set the PORT
When you run any of these examples, you need to specify the port that the Arduino is connected to. For example:

```
PORT=/dev/ttyACM0 node 1.js
```

## Code

### 1.js - Blue LED

Connect the blue LED to D3.

Run the code.

You should see the blue LED blink.

### 2.js - Blue LED, Button

Connect the button to D2.

Run the code.

When you press the button, the blue LED should turn on.

### 3.js - Blue LED, Button, Green LED

Connect the Green LED to D4.

Run the code.

The green LED should light up. When you press the button, the blue LED should turn on, and the green LED should turn off.

### 4.js - Blue LED, Button, Green LED, Cylon.js API

This step has us playing with the Cylon.js API. No additional hardware needs to be connected.

Run the code.

You can now point your web browser to `http://localhost:3000` and try out the [Robeaux](https://github.com/hybridgroup/robeaux) web interface.

### 5.js - Blue LED, Button, Green LED, Cylon.js API, Buzzer, Touch

Connect the buzzer to D7, and connect the touch sensor to D8.

Run the code.

When your finger touches the capacitive touch sensor, the buzzer should sound.

### 6.js - Blue LED, Button, Green LED, Cylon.js API, Buzzer, Touch, Dial

Connect the rotary dial to A0.

Run the code.

Turning the dial will display the current analog reading on your console.

### 7.js - Blue LED, Button, Green LED, Cylon.js API, Buzzer, Touch, Dial, Temperature, Red LED

Connect the temperature sensor to A1, and the red LED to D5

Run the code.

If the temperature exceeds 400 degrees, then the red led will light up.

### 8.js - Blue LED, Button, Green LED, Cylon.js API, Buzzer, Touch, Dial, Temperature, Red LED, Sound

Connect the sound sensor to A2.

Run the code.

When a sound is detected, the blue LED will light up, the sound sensor reading will be displayed on your computer's console.

### 9.js - Blue LED, Button, Green LED, Cylon.js API, Buzzer, Touch, Dial, Temperature, Red LED, Sound, Light

Connect the light sensor to A3.

Run the code.

When a light is detected, the blue LED will light up, and the light sensor reading will be displayed on your computer's console.
