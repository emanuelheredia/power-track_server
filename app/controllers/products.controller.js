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
		const cleanList = removeElemtnsRepeted(products);
		res.send({ data: cleanList });
	} catch (error) {
		console.log(error);
	}
};
const getColorsToFilter = async (req, res) => {
	const { categories } = req.body;
	try {
		const products = await ModelProduct.find()
			.where(
				"category",
				categories.map((el) => el.toLocaleUpperCase()),
			)
			.select(["color", "-_id"]);
		const cleanList = removeElemtnsRepeted(products);
		res.send({ data: cleanList });
	} catch (error) {
		console.log(error);
	}
};
const getImagesOfSubCategories = async (req, res) => {
	const { subCategory, color } = req.body;
	try {
		const products = await ModelProduct.findOne()
			.where({ color: color, subCategory: subCategory })
			.select(["images", "-_id"]);
		res.send({ data: products.images });
	} catch (error) {
		console.log(error);
	}
};
const updateImagesSubCategory = async (req, res) => {
	const { subCategory, color, newImages } = req.body;
	try {
		const respuesta = await ModelProduct.updateMany(
			{
				subCategory: subCategory,
				color: color,
			},
			{ images: newImages },
		);
		if (respuesta.acknowledged == true) {
			res.send({ msg: "La actualización fue exitosa" });
		} else {
			res.send({ msg: "No fue exitosa" });
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteAllProducts = async (req, res) => {
	try {
		await ModelProduct.deleteMany()
			.then((resp) => console.log({ eliminacionMsg: resp }))
			.catch((err) => console.log(err));

		res.send({ msg: "Elimincacion Exitosa" });
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
	console.log(await ModelProduct.find());
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
	deleteAllProducts,
	getColorCategory,
	getColorsToFilter,
	getImagesOfSubCategories,
	updateImagesSubCategory,
};
/* module.exports = addProduct;
 */
