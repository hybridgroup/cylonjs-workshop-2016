var cylon = require("cylon");

cylon.api({
  host: "0.0.0.0",
  port: "3000",
  ssl: false
});

cylon.robot({
  name: "airlockbot",
  connections: {
    arduino: { adaptor: "firmata", port: process.env.PORT }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "arduino" },
    blue:   { driver: "led",           pin: 3, connection: "arduino" },
    green:  { driver: "led",           pin: 4, connection: "arduino" },
    red:    { driver: "led",           pin: 5, connection: "arduino" },
    buzzer: { driver: "direct-pin",    pin: 7, connection: "arduino" },
    touch:  { driver: "button",        pin: 8, connection: "arduino" },
    // analog devices
    dial:   { driver: "analogSensor",  pin: 0, connection: "arduino" },
    temp:   { driver: "analogSensor",  pin: 1, connection: "arduino" },
    sound:  { driver: "analogSensor",  pin: 2, connection: "arduino" },
    light:  { driver: "analogSensor",  pin: 3, connection: "arduino" }
  },
  fireAlarm: function() {
    var my = this;
    var deg = my.currentTemp;
    console.log("current temp:", deg);
    if (deg >= 400) {
      my.turnOn("red");
      my.buzzer.digitalWrite(1);
      setTimeout(function() {
        my.buzzer.digitalWrite(0);
      }, 200);
    }
  },
  detectSound: function(val) {
    var my = this;
    if (val >= 450) {
      console.log("Sound detected:", val)
      my.turnOn("blue");
      setTimeout(function() {
        my.reset();
      }, 500);
    }
  },
  detectLight: function(val) {
    var my = this;
    var date = new Date();
    var currentHour = date.getHours();
    if (currentHour > 19 && currentHour < 8 && val >= 450) {
      console.log("Light detected:", val)
      my.turnOn("blue");
      setTimeout(function() {
        my.reset();
      }, 500);
    }
  },
  turnDial: function(val) {
    console.log("Turning dial:", val);
  },
  doorbell: function() {
    var my = this;
    my.buzzer.digitalWrite(1);
    my.turnOn("blue");
    setTimeout(function() {
      my.reset();
    }, 1000);
  },
  turnOn: function(color) {
    this.turnOff();
    this[color].turnOn();
  },
  turnOff: function() {
    this.red.turnOff();
    this.blue.turnOff();
    this.green.turnOff();
  },
  reset: function() {
    console.log("Airlock ready");
    this.turnOn("green");
    this.buzzer.digitalWrite(0);
  },
  work: function(my) {
    my.currentTemp = 0;
    my.reset();

    my.button.on('push', function() {
      my.turnOn("blue");
    });

    my.button.on('release', function() {
      my.reset();
    });

    my.dial.on('analogRead', function(val) {
      my.turnDial(val);
    });

    my.temp.on('analogRead', function(val) {
      my.currentTemp = val;
    });

    my.sound.on('analogRead', function(val) {
      my.detectSound(val);
    });

    my.light.on('analogRead', function(val) {
      my.detectLight(val);
    });

    my.touch.on('push', function() {
      my.doorbell();
    });

    setInterval(function() {
      my.fireAlarm();
    }, 1000);
  }
}).start();
