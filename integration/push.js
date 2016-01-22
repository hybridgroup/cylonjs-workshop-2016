var cylon = require("cylon");

cylon.robot({
  name: "doorbot",
  connections: {
    edison: { adaptor: "intel-iot" },
    bluetooth: { adaptor: "central", uuid: "cc361e85785e", module: "cylon-ble" }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "edison" },
    blue:   { driver: "led",           pin: 3, connection: "edison" },
    green:  { driver: "led",           pin: 4, connection: "edison" },
    ollie:  { driver: "ollie", module: "cylon-sphero-ble", connection: "bluetooth" }
  },
  turnOn: function(color) {
    this.turnOff();
    this[color].turnOn();
    this.ollie.color(color);
  },
  turnOff: function() {
    this.blue.turnOff();
    this.green.turnOff();
  },
  reset: function() {
    console.log("Doorbot ready");
    this.turnOn("green");
  },
  work: function(self) {
    self.reset();

    self.button.on('push', function() {
      self.turnOn("blue");
    });

    self.button.on('release', function() {
      self.reset();
    });
  }
}).start();
