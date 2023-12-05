const { removeImagesRepeted } = require("../helpers");
const AccesorieModel = require("../models/accessories.model");

const addNewAccessorie = async (req, res) => {
	const data = req.body;
	console.log(data);
	try {
		const respuesta = await AccesorieModel.insertMany(data);
		console.log(respuesta);
		res.send({ msg: "La imágen se agregó con éxito" });
	} catch (error) {
		res.status(404).send({
			msg: "La imagen del accesorio no pudo cargarse correctamente",
		});
	}
};
const getAccessoriesImages = async (req, res) => {
	const { model } = req.body;
	try {
		const products = await AccesorieModel.find()
			.where("model", [model])
			.select(["images", "category", "-_id"]);
		res.send({ data: products });
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	addNewAccessorie,
	getAccessoriesImages,
};
