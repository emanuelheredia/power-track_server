const config = require("../config/config");
const crypto = require("crypto-js");
const cryptoJs = require("crypto-js");

const removeElemtnsRepeted = (array, attribute) => {
	const cleanList = [];
	for (element of array) {
		if (
			element[attribute] &&
			!cleanList.includes(element[attribute]) &&
			element[attribute] !== "sin datos"
		) {
			cleanList.push(element[attribute]);
		}
	}

	return cleanList.length > 1 ? cleanList : [];
};

const removeImagesRepeted = (array) => {
	const cleanList = [];
	for (element of array) {
		if (!cleanList.includes(element.images)) cleanList.push(element.images);
	}
	return cleanList.length > 1 ? cleanList : [];
};

function desencriptarFront(string) {
	const secretKey = config.acceso.secretKeyFront;
	return crypto.AES.decrypt(string, secretKey).toString(cryptoJs.enc.Utf8);
}
module.exports = {
	removeElemtnsRepeted,
	removeImagesRepeted,
	desencriptarFront,
};
