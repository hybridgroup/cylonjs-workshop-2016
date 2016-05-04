var cylon = require("cylon");

cylon.api({
  host: "0.0.0.0",
  port: "3000",
  ssl: false
});

cylon.robot({
  name: "doorbot",
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
    var self = this;
    self.buzzer.digitalWrite(1);
    self.turnOn("blue");
    setTimeout(function() {
      self.reset();
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
    console.log("Doorbot ready");
    this.turnOn("green");
    this.buzzer.digitalWrite(0);
  },
  work: function(self) {
    self.reset();

    self.button.on('push', function() {
      self.turnOn("blue");
    });

    self.button.on('release', function() {
      self.reset();
    });

    self.touch.on('push', function() {
      self.doorbell();
    });
  }
}).start();
