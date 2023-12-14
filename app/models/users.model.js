const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
	{
		idCliente: Number,
		email: String,
		password: String,
		name: String,
		rol: String,
	},
	{ timestamps: true },
);

module.exports = model("users", usersSchema);
