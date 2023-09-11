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
module.exports = { removeElemtnsRepeted };
