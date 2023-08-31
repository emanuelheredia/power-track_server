const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const initDB = require("./config/db");
const productsRouter = require("./app/routes/productos.router");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.urlencoded({ extended: false }));
app.use(productsRouter.Router);
app.listen(port, () => console.log("escuchando en puerto" + port));

initDB();
