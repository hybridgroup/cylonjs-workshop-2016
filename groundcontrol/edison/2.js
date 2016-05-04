var cylon = require("cylon");

cylon.robot({
  name: "doorbot",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "edison" },
    blue:   { driver: "led",           pin: 3, connection: "edison" }
  },
  work: function(self) {
    self.button.on('push', function() {
      self.blue.turnOn();
    });

    self.button.on('release', function() {
      self.blue.turnOff();
    });
  }
}).start();
