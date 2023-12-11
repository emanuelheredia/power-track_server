const ModelUsers = require("../models/users.model");

const addNewUser = async (req, res) => {
	const data = req.body;
	console.log(data);
	try {
		if (await ModelUsers.exists({ email: data.email })) {
			res.status(402).json({ msg: "El email ya existe" });
			return;
		}
		const respuesta = await ModelUsers.insertMany(data);
		console.log(respuesta);
		res.send({ msg: "Usuario creado con éxito" });
	} catch (error) {
		res.status(404).send({
			msg: "La creación del usuario no fue exitosa",
		});
	}
};
module.exports = {
	addNewUser,
};
