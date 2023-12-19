const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
	{
		idCliente: String,
		password: String,
		name: String,
		rol: String,
	},
	{ timestamps: true },
);

module.exports = model("users", usersSchema);
