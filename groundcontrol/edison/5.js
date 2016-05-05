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
    buzzer: { driver: "direct-pin",    pin: 7, connection: "edison" },
    touch:  { driver: "button",        pin: 8, connection: "edison" }
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

    my.touch.on('push', function() {
      my.doorbell();
    });
  }
}).start();
