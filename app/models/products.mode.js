const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		code: String,
		category: String,
		subCategory: String,
		images: Array,
		color: String,
		mark: String,
		moreInfo: String,
		price: Number,
		vehiculo: String,
		proveedor: String,
	},
	{ timestamp: true },
);

module.exports = model("product", productSchema);
