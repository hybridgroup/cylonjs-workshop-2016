var Cylon = require("cylon");

Cylon.robot({
	connections: {
		spider: { adaptor: "rolling-spider", uuid: process.env.ID }
	},

	devices: {
		drone: { driver: "rolling-spider" }
	},

	work: function (my) {
		my.drone.wheelOn();
		my.drone.flatTrim();
		my.drone.takeOff();

    after(4000, function() {
			my.drone.frontFlip();
		});

    after(8000, function() {
			my.drone.backFlip();
		});

    after(10000, function() {
			my.drone.land();
		});
	}
}).start();
