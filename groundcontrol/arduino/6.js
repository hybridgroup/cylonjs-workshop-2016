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
    buzzer: { driver: "direct-pin",    pin: 7, connection: "arduino" },
    touch:  { driver: "button",        pin: 8, connection: "arduino" },
    // analog devices
    dial:   { driver: "analogSensor",  pin: 0, connection: "arduino" }
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
    this.blue.turnOff();
    this.green.turnOff();
  },
  reset: function() {
    console.log("Airlock ready");
    this.turnOn("green");
    this.buzzer.digitalWrite(0);
  },
  work: function(my) {
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

    my.touch.on('push', function() {
      my.doorbell();
    });
  }
}).start();
