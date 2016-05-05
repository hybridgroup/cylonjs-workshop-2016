var cylon = require("cylon");

cylon.robot({
  name: "airlockbot",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    // digital devices
    button: { driver: "button",        pin: 2, connection: "edison" },
    blue:   { driver: "led",           pin: 3, connection: "edison" }
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
