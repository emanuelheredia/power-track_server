const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
	{
		email: String,
		password: String,
		rol: String,
	},
	{ timestamps: true },
);

module.exports = model("users", usersSchema);
