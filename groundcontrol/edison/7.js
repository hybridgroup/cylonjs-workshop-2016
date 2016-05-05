var cylon = require("cylon");

cylon.api({
  host: "0.0.0.0",
  port: "3000",
  ssl: false
});

cylon.robot({
  name: "airlockbot",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "edison" },
    blue:   { driver: "led",           pin: 3, connection: "edison" },
    green:  { driver: "led",           pin: 4, connection: "edison" },
    red:    { driver: "led",           pin: 5, connection: "edison" },
    buzzer: { driver: "direct-pin",    pin: 7, connection: "edison" },
    touch:  { driver: "button",        pin: 8, connection: "edison" },
    // analog devices
    dial:   { driver: "analogSensor",  pin: 0, connection: "edison" },
    temp:   { driver: "analogSensor",  pin: 1, connection: "edison" }
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

    my.touch.on('push', function() {
      my.doorbell();
    });

    setInterval(function() {
      my.fireAlarm();
    }, 1000);
  }
}).start();
