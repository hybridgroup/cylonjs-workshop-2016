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
    red:    { driver: "led",           pin: 5, connection: "edison" },
    buzzer: { driver: "direct-pin",    pin: 7, connection: "edison" },
    touch:  { driver: "button",        pin: 8, connection: "edison" },
    // analog devices
    dial:   { driver: "analogSensor",  pin: 0, connection: "edison" },
    temp:   { driver: "analogSensor",  pin: 1, connection: "edison" },
    sound:  { driver: "analogSensor",  pin: 2, connection: "edison" }
  },
  fireAlarm: function() {
    var self = this;
    var deg = self.currentTemp;
    console.log("current temp:", deg);
    if (deg >= 400) {
      self.turnOn("red");
      self.buzzer.digitalWrite(1);
      setTimeout(function() {
        self.buzzer.digitalWrite(0);
      }, 200);
    }
  },
  detectSound: function(val) {
    var self = this;
    if (val >= 450) {
      console.log("Sound detected:", val)
      self.turnOn("blue");
      setTimeout(function() {
        self.reset();
      }, 500);
    }
  },
  turnDial: function(val) {
    console.log("Turning dial:", val);
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
    this.red.turnOff();
    this.blue.turnOff();
    this.green.turnOff();
  },
  reset: function() {
    console.log("Doorbot ready");
    this.turnOn("green");
    this.buzzer.digitalWrite(0);
  },
  work: function(self) {
    self.currentTemp = 0;
    self.reset();

    self.button.on('push', function() {
      self.turnOn("blue");
    });

    self.button.on('release', function() {
      self.reset();
    });

    self.dial.on('analogRead', function(val) {
      self.turnDial(val);
    });

    self.temp.on('analogRead', function(val) {
      self.currentTemp = val;
    });

    self.sound.on('analogRead', function(val) {
      self.detectSound(val);
    });

    self.touch.on('push', function() {
      self.doorbell();
    });

    setInterval(function() {
      self.fireAlarm();
    }, 1000);
  }
}).start();
