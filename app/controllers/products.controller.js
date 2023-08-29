const ModelProduct = require("../models/products.mode");

const getProducts = async (req, res) => {
	const products = await ModelProduct.find();
	try {
		res.send({ msg: "hello " });
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
module.exports = { getProducts, addProduct };
console.log(module.exports);
/* module.exports = addProduct;
 */
