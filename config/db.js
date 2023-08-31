const mongoose = require("mongoose");

const user = "power-track";
const pass = "powertrack321";
const DB_URI = `mongodb+srv://${user}:${pass}@cluster0.iqteyya.mongodb.net/power-track?retryWrites=true&w=majority`;
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
