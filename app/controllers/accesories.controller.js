const { removeImagesRepeted, removeElemtnsRepeted } = require("../helpers");
const AccesorieModel = require("../models/accessories.model");

const addNewAccessorie = async (req, res) => {
	const data = req.body;
	try {
		const respuesta = await AccesorieModel.insertMany(data);
		res.send({ data: respuesta, msg: "La imágen se agregó con éxito" });
	} catch (error) {
		res.status(404).send({
			msg: "La imagen del accesorio no pudo cargarse correctamente",
		});
	}
};
const getAccessoriesImages = async (req, res) => {
	const { query, limit } = req.body;
	try {
		const products = await AccesorieModel.find()
			.where(query)
			.select(["images", "category", "proveedor", "public_id", "_id"])
			.limit(limit);
		res.send({ data: products });
	} catch (error) {
		console.log(error);
	}
};
const getAccessoriesAttribute = async (req, res) => {
	const { query, attributes } = req.body;
	try {
		const products = await AccesorieModel.find()
			.where(query)
			.select(attributes);
		res.send({ data: removeElemtnsRepeted(products, "category") });
	} catch (error) {
		console.log(error);
	}
};
const updateAccessoriesImages = async (req, res) => {
	try {
		const products = await AccesorieModel.find().updateMany(
			{
				category: "ESTRIBO OBAL",
			},
			{ category: "ESTRIBO OVAL" },
		);
		console.log("ACTUALICÉ", products);
		console.log(products);
	} catch (error) {
		console.log(error);
	}
};
const deleteImage = async (req, res) => {
	const { id } = req.body;
	try {
		const respuesta = await AccesorieModel.deleteOne({ _id: id });
		if (respuesta.deletedCount === 1) {
			res.status(200).json({
				msg: "La imagen se eliminó de forma permanente",
			});
			return;
		}
		if (respuesta.deletedCount === 0) {
			res.status(402).json({
				msg: "La imagen ya se eliminó anteriormente, actualice la página para ver reflejado el cambio",
			});
			return;
		}
	} catch (error) {
		res.status(404).json({
			msg: "La imagen no pudo eliminarse de la base de datos",
		});
	}
};
const getAccessoriesCategories = async (req, res) => {
	const { model } = req.body;
	try {
		const products = await AccesorieModel.find()
			.where("model", [model])
			.select("superCategory");

		const categories = removeElemtnsRepeted(products, "superCategory");
		res.send(categories);
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	addNewAccessorie,
	getAccessoriesImages,
	deleteImage,
	getAccessoriesCategories,
	updateAccessoriesImages,
	getAccessoriesAttribute,
};
