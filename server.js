const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;
const initDB = require("./config/db");
const productsRouter = require("./app/routes/productos.router");
const usersRouter = require("./app/routes/users.router");
const cors = require("cors");
const {
	updateAccessoriesImages,
} = require("./app/controllers/accesories.controller");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.urlencoded({ extended: false }));
app.use(productsRouter.Router);
app.use(usersRouter.Router);
app.listen(port, "0.0.0.0", () => {
	console.log("escuchando en puerto " + port);
	/*
	updateAccessoriesImages();
	 */
});

initDB();
