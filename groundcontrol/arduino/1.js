var cylon = require("cylon");

cylon.robot({
  name: "airlockbot",
  connections: {
    arduino: { adaptor: "firmata", port: process.env.PORT }
  },
  devices: {
    // digital devices
    blue:   { driver: "led", pin: 3, connection: "arduino" }
  },
  work: function(my) {
    setInterval(function() {
      my.blue.toggle();
    }, 1000);
  }
}).start();
