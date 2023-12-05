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
	addNewProduct,
	deleteProducts,
} = require("../controllers/products.controller.js");
const {
	addNewNews,
	getAllNews,
	deleteNews,
} = require("../controllers/news.controller.js");
const {
	addNewAccessorie,
	getAccessoriesImages,
} = require("../controllers/accesories.controller.js");

router.get("/products", getProducts);
/* router.post("/products", addVaroiusProducts);
 */ router.post("/imagesOfSubcategory", getImagesOfSubCategories);
router.post("/update-subCategoryImages", updateImagesSubCategory);
router.post("/update-products", updateBachProducts);
router.post("/options-update-image", getOptionsToUpdateImages);
router.post("/values-attribute-select", getValuesAttributeSelects);
router.post("/add-new-product", addNewProduct);
router.post("/add-new-news", addNewNews);
router.get("/get-all-news", getAllNews);
router.delete("/news", deleteNews);
router.delete("/products", deleteProducts);
router.post("/add-new-accessorie-image", addNewAccessorie);
router.post("/get-accessorie-images", getAccessoriesImages);

exports.Router = router;
