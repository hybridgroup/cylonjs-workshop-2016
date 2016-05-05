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
  work: function(my) {
    my.button.on('push', function() {
      my.blue.turnOn();
    });

    my.button.on('release', function() {
      my.blue.turnOff();
    });
  }
}).start();
