var cylon = require("cylon");

cylon.robot({
  name: "doorbot",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    // digital devices
    blue:   { driver: "led",           pin: 3, connection: "edison" }
  },
  work: function(self) {
    setInterval(function() {
      self.blue.toggle();
    }, 1000);
  }
}).start();
