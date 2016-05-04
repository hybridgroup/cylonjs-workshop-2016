var cylon = require("cylon");

cylon.robot({
  name: "airlockbot",
  connections: {
    arduino: { adaptor: "firmata", port: process.env.PORT }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "arduino" },
    blue:   { driver: "led",           pin: 3, connection: "arduino" }
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
