const ModelUsers = require("../models/users.model");
const { desencriptarFront } = require("../helpers/index");
const jwt = require("jsonwebtoken");

const addNewUser = async (req, res) => {
	const data = req.body;
	try {
		if (await ModelUsers.exists({ idCliente: data.idCliente })) {
			res.status(203).json({
				msg: "El número de cliente ya está registrado",
			});
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
	const { userID, password } = req.body;
	try {
		if (!(await ModelUsers.exists({ idCliente: userID }))) {
			res.status(203).json({
				msg: "El numero de cliente no está registrado",
			});
			return;
		}
		const user = (
			await ModelUsers.find({ idCliente: userID }).select([
				"password",
				"name",
			])
		)[0];
		if (desencriptarFront(password) !== desencriptarFront(user.password)) {
			res.status(203).json({ msg: "Password incorrecto" });
			return;
		}
		const token = jwt.sign(
			{
				idCliente: userID,
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
