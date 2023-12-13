const ModelUsers = require("../models/users.model");
const { desencriptarFront } = require("../helpers/index");
const jwt = require("jsonwebtoken");

const addNewUser = async (req, res) => {
	const data = req.body;
	try {
		if (await ModelUsers.exists({ email: data.email })) {
			res.status(203).json({ msg: "El email ya existe" });
			return;
		}
		const respuesta = await ModelUsers.insertMany(data);
		return res.status(200).json({ msg: "Usuario creado con éxito" });
	} catch (error) {
		res.status(404).send({
			msg: "La creación del usuario no fue exitosa",
		});
	}
};
const signInUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!(await ModelUsers.exists({ email: email }))) {
			res.status(203).json({ msg: "El email no está registrado" });
			return;
		}
		const user = (
			await ModelUsers.find({ email: email }).select(["password", "name"])
		)[0];
		if (desencriptarFront(password) !== desencriptarFront(user.password)) {
			res.status(203).json({ msg: "Password incorrecto" });
			return;
		}
		const token = jwt.sign(
			{
				email: email,
			},
			"MY_SECRET",
			{
				expiresIn: "24h",
			},
		);
		return res.status(200).json({ token: token, name: user.name });
	} catch (error) {
		res.status(404).send({
			msg: "Error de servidor",
		});
	}
};
module.exports = {
	addNewUser,
	signInUser,
};
