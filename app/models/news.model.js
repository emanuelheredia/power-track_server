const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
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
	{ timestamps: true },
);

module.exports = model("news", newsSchema);
