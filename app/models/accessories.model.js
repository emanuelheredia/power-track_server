const { Schema, model } = require("mongoose");

const accesoriesSchema = new Schema(
	{
		model: String,
		category: String,
		superCategory: String,
		proveedor: String,
		images: String,
		public_id: String,
	},
	{ timestamps: true },
);

module.exports = model("accessories", accesoriesSchema);
