const { Router } = require("express");
const router = Router();
const {
	getProducts,
	addProduct,
	addVaroiusProducts,
	deleteAllProducts,
	getColorCategory,
	getColorsToFilter,
} = require("../controllers/products.controller.js");

router.get("/products", getProducts);
router.post("/color-category", getColorCategory);
router.post("/color-filter-values", getColorsToFilter);
router.post("/products", addVaroiusProducts);
router.delete("/products", deleteAllProducts);

exports.Router = router;
