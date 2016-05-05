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

		after(5000, function() {
			my.drone.land();
		});
	}
}).start();
