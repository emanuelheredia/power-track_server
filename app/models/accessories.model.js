const { Schema, model } = require("mongoose");

const accesoriesSchema = new Schema(
	{
		model: String,
		category: String,
		images: String,
	},
	{ timestamps: true },
);

module.exports = model("accessories", accesoriesSchema);
