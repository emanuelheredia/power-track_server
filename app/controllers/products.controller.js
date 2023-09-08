const { removeElemtnsRepeted } = require("../helpers");
const ModelProduct = require("../models/products.mode");

const getProducts = async (req, res) => {
	const products = await ModelProduct.find();
	/* 	  
	const products = await ModelProduct.updateMany(
		{
			subCategory: "ALERON CHEVROLET S10 HIGH COUNTRY",
		},
		{ vehiculo: "Aleron S10 High Country" },
		);
		*/
	try {
		res.send({ data: products });
	} catch (error) {
		console.log(error);
	}
};
const getColorCategory = async (req, res) => {
	const { category } = req.body;
	try {
		const products = await ModelProduct.find({
			subCategory: category,
		}).select(["color", "-_id"]);
		const cleanList = removeElemtnsRepeted(products, "color");
		res.send({ data: cleanList });
	} catch (error) {
		console.log(error);
	}
};
const getValuesAttributeSelects = async (req, res) => {
	const { attribute, info } = req.body;
	let products;
	try {
		if (info) {
			products = await ModelProduct.find()
				.where(
					"category",
					info.map((el) => el.toLocaleUpperCase()),
				)
				.select([attribute, "-_id"]);
		} else {
			products = await ModelProduct.find().select([attribute, "-_id"]);
		}
		const cleanList = removeElemtnsRepeted(products, attribute);
		res.send({ data: cleanList });
	} catch (error) {
		console.log(error);
	}
};

const getImagesOfSubCategories = async (req, res) => {
	const { subCategory, color } = req.body;
	const query = {
		subCategory: subCategory,
	};
	if (color) query.color = color;
	try {
		const products = await ModelProduct.findOne()
			.where(query)
			.select(["images", "-_id"]);
		res.send({ data: products.images });
	} catch (error) {
		console.log(error);
	}
};
const updateBachProducts = async (req, res) => {
	const products = req.body;
	try {
		let respPromises = products.map((product) => {
			return ModelProduct.updateMany(
				{ code: product.code },
				{
					price: product.price,
				},
			);
		});
		const succesUpdates = await Promise.all(respPromises).then((datos) =>
			datos
				.map((resp, index) => {
					if (resp.acknowledged && resp.matchedCount >= 1) {
						return 1;
					} else {
						return 0;
					}
				})
				.reduce((a, b) => a + b, 0),
		);
		if (succesUpdates === 0) {
			res.status(401).json({ msg: "Error en  la actualización" });
		}
		if (succesUpdates > 0 && succesUpdates !== products.length) {
			res.send({
				msg:
					"Algunos precios no lograron actualizarse. " +
					succesUpdates +
					" productos actualizados de " +
					products.length,
			});
		}
		if (succesUpdates === products.length)
			res.status(200).json({
				msg:
					"La actualización se completó con éxito. Se han actualizado " +
					succesUpdates +
					" productos",
			});
	} catch (error) {
		console.log(error);
	}
};

const updateImagesSubCategory = async (req, res) => {
	const { subCategory, color, newImages } = req.body;
	const query = {
		subCategory: subCategory,
	};
	if (color) query.color = color;

	try {
		const respuesta = await ModelProduct.updateMany(query, {
			images: newImages,
		});
		if (respuesta.acknowledged == true) {
			res.send({ msg: "La actualización fue exitosa" });
		} else {
			res.send({ msg: "No fue exitosa" });
		}
	} catch (error) {
		console.log(error);
	}
};

const addVaroiusProducts = async (req, res) => {
	const { body } = req;
	const data = body;
	try {
		ModelProduct.insertMany(data)
			.then((resp) => res.send({ msg: resp }))
			.catch((err) => res.send({ err: err }));
	} catch (error) {
		console.log(error);
	}
};
const addProduct = async (req, res) => {
	const productsVarious = [
		{ code: "359" },
		{
			code: 69877,
		},
	];

	try {
		ModelProduct.insertMany(productsVarious)
			.then((res) => console.log({ resp: res }))
			.catch((err) => console.log({ error: err }));
		res.send({ msg: "usuario agregado" });
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	getProducts,
	addProduct,
	addVaroiusProducts,
	getColorCategory,
	getImagesOfSubCategories,
	updateImagesSubCategory,
	updateBachProducts,
	getValuesAttributeSelects,
};
/* module.exports = addProduct;
 */
