const ModelNews = require("../models/news.model");

const getAllNews = async (req, res) => {
	const news = await ModelNews.find();
	/* 	  
	const products = await ModelProduct.updateMany(
		{
			code: ["130FF", "056FF", "130RP", "948RP"],
		},
		{ mark: "Mitsubishi" },
		);
		*/
	try {
		res.send({ data: news });
	} catch (error) {
		console.log(error);
	}
};
const addNewNews = async (req, res) => {
	const data = req.body;
	try {
		if (await ModelNews.exists({ code: data.code })) {
			res.status(404).json({ msg: "El código ya existe" });
			return;
		}
		const respuesta = await ModelNews.insertMany(data);
		res.send({ msg: respuesta });
	} catch (error) {
		res.status(404).send({
			msg: "El cargado del producto no fue exitoso",
		});
	}
};

const deleteNews = async (req, res) => {
	const { id } = req.body;
	try {
		const respuesta = await ModelNews.deleteOne({ _id: id });
		if (respuesta.deletedCount === 1) {
			res.status(200).json({
				msg: "La novedad se eliminó de forma permanente",
			});
			return;
		}
		if (respuesta.deletedCount === 0) {
			res.status(402).json({
				msg: "La novedad ya se eliminó anteriormente, actualice la página para ver reflejado el cambio",
			});
			return;
		}
	} catch (error) {
		res.status(404).json({
			msg: "La novedad no pudo eliminarse de la base de datos",
		});
	}
};
module.exports = {
	addNewNews,
	getAllNews,
	deleteNews,
};
