const { Router } = require("express");
const router = Router();
const {
	getProducts,
	addProduct,
	addVaroiusProducts,
	deleteAllProducts,
	getColorCategory,
} = require("../controllers/products.controller.js");

router.get("/products", getProducts);
router.post("/color-category", getColorCategory);
router.post("/products", addVaroiusProducts);
router.delete("/products", deleteAllProducts);

exports.Router = router;
