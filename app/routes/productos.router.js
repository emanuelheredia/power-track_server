const { Router } = require("express");
const router = Router();
const { getProducts } = require("../controllers/products.controller.js");
const { addProduct } = require("../controllers/products.controller.js");

router.get("/products", getProducts);
router.post("/products", addProduct);

exports.Router = router;
