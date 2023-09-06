const { Router } = require("express");
const router = Router();
const {
	getProducts,
	addProduct,
	addVaroiusProducts,
	getColorCategory,
	getColorsToFilter,
	getCategoriesToFilter,
	getSubCategoriesToFilter,
	getImagesOfSubCategories,
	updateImagesSubCategory,
	updateBachProducts,
} = require("../controllers/products.controller.js");

router.get("/products", getProducts);
router.post("/products", addVaroiusProducts);
router.post("/imagesOfSubcategory", getImagesOfSubCategories);
router.post("/update-subCategoryImages", updateImagesSubCategory);
router.post("/update-products", updateBachProducts);
router.post("/color-category", getColorCategory);
router.post("/color-filter-values", getColorsToFilter);
router.get("/categories-filter-values", getCategoriesToFilter);
router.get("/subCategories-filter-values", getSubCategoriesToFilter);

exports.Router = router;
