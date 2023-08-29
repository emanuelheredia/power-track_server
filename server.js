const express = require("express");
const app = express();
const port = 3001;
const initDB = require("./config/db");

app.get("/", (req, res) => {
	res.json({ msg: "hello word" });
});

app.listen(port, () => console.log("escuchando en puerto" + port));
initDB();
