const { options } = require("nodemon/lib/config");
const { removeElemtnsRepeted } = require("../helpers");
const ModelProduct = require("../models/products.mode");

const deleteProducts = async (req, res) => {
	const { id } = req.body;
	try {
		const respuesta = await ModelProduct.deleteOne({ _id: id });
		if (respuesta.deletedCount === 1) {
			res.status(200).json({
				msg: "El producto se eliminó de forma permanente",
			});
			return;
		}
		if (respuesta.deletedCount === 0) {
			res.status(402).json({
				msg: "El producto ya se eliminó anteriormente, actualice la página para ver reflejado el cambio",
			});
			return;
		}
	} catch (error) {
		res.status(404).json({
			msg: "El no pudo eliminarse de la base de datos",
		});
	}
};
const getProducts = async (req, res) => {
	const products = await ModelProduct.find();
	/* 	  
	const products = await ModelProduct.updateMany(
		{
			code: ["130FF", "056FF", "130RP", "948RP"],
		},
		{ mark: "Mitsubishi" },
		);
		*/
	try {
		res.send({ data: products });
	} catch (error) {
		console.log(error);
	}
};
const getOptionsToUpdateImages = async (req, res) => {
	const { query, attribute } = req.body;
	try {
		const products = await ModelProduct.find(query).select([
			attribute,
			"-_id",
		]);
		const cleanList = removeElemtnsRepeted(products, attribute);
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
	const { query } = req.body;
	const { code, subCategory, color, marca, vehiculo } = query;
	let finalQuery = {};
	if (code) {
		if (!(await ModelProduct.exists({ code: code }))) {
			res.status(400).json({ msg: "El código ingresado no existe" });
			return;
		} else {
			finalQuery.code = query.code;
		}
	} else {
		finalQuery.subCategory = subCategory;
		if (color !== "" && color !== "all") {
			finalQuery.color = color;
		}
		if (marca !== "" && marca !== "all") {
			finalQuery.mark = marca;
		}
		if (vehiculo !== "" && vehiculo !== "all") {
			finalQuery.vehiculo = vehiculo;
		}
	}
	try {
		const products = await ModelProduct.findOne()
			.where(finalQuery)
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
	const { newImages, query } = req.body;
	const { color, code, subCategory, marca, vehiculo } = query;
	let finalQuery = {};
	if (code) {
		finalQuery.code = code;
	} else {
		finalQuery.subCategory = subCategory;
		if (color !== "" && color !== "all") finalQuery.color = color;
		if (marca !== "" && marca !== "all") finalQuery.mark = marca;
		if (vehiculo !== "" && vehiculo !== "all")
			finalQuery.vehiculo = vehiculo;
	}
	try {
		const respuesta = await ModelProduct.updateMany(finalQuery, {
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
const addNewProduct = async (req, res) => {
	const data = req.body;
	try {
		if (await ModelProduct.exists({ code: data.code })) {
			res.status(404).json({ msg: "El código ya existe" });
			return;
		}
		const respuesta = await ModelProduct.insertMany(data);
		res.send({ msg: "El producto se agregó de manera exitosa" });
	} catch (error) {
		res.status(404).send({
			msg: "El cargado del producto no fue exitoso",
		});
	}
};
module.exports = {
	getProducts,
	addVaroiusProducts,
	getOptionsToUpdateImages,
	getImagesOfSubCategories,
	updateImagesSubCategory,
	updateBachProducts,
	getValuesAttributeSelects,
	addNewProduct,
	deleteProducts,
};
/* module.exports = addProduct;
 */
