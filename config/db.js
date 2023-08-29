const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost/powertracker";

module.exports = () => {
	const connect = () => {
		mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	};
	connect();
	const connection = mongoose.connection;
	connection.once("open", () => console.log("DB is connected"));
};
