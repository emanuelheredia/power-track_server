const { Router } = require("express");
const router = Router();
const {
	getProducts,
	addProduct,
	addVaroiusProducts,
	getOptionsToUpdateImages,
	getImagesOfSubCategories,
	updateImagesSubCategory,
	updateBachProducts,
	getValuesAttributeSelects,
} = require("../controllers/products.controller.js");

router.get("/products", getProducts);
/* router.post("/products", addVaroiusProducts);
 */ router.post("/imagesOfSubcategory", getImagesOfSubCategories);
router.post("/update-subCategoryImages", updateImagesSubCategory);
router.post("/update-products", updateBachProducts);
router.post("/options-update-image", getOptionsToUpdateImages);
router.post("/values-attribute-select", getValuesAttributeSelects);

exports.Router = router;
