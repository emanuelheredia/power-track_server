const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		code: { type: String, unique: true, required: true },
		category: String,
		subCategory: String,
		images: Array,
		color: String,
	},
	{ timestamp: true },
);

module.exports = model("product", productSchema);
