var cylon = require("cylon");

cylon.robot({
  name: "airlockbot",
  connections: {
    arduino: { adaptor: "firmata", port: process.env.PORT }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "arduino" },
    blue:   { driver: "led",           pin: 3, connection: "arduino" },
    green:  { driver: "led",           pin: 4, connection: "arduino" }
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
  },
  work: function(my) {
    my.reset();

    my.button.on('push', function() {
      my.turnOn("blue");
    });

    my.button.on('release', function() {
      my.reset();
    });
  }
}).start();
