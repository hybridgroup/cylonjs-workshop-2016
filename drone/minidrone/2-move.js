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

		after(3000, function() {
			my.drone.forward({steps: 12});
		});

    after(4000, function() {
			my.drone.backward({steps: 12});
		});

    after(5000, function() {
			my.drone.up({steps: 12});
		});

    after(6000, function() {
			my.drone.down({steps: 12});
		});

    after(7000, function() {
			my.drone.left({steps: 12});
		});

    after(8000, function() {
			my.drone.right({steps: 12});
		});

    after(9000, function() {
			my.drone.land();
		});
	}
}).start();
