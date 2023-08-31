const removeElemtnsRepeted = (array) => {
	const cleanList = [];
	for (element of array) {
		if (
			!cleanList.includes(element.color) &&
			element.color !== "sin datos"
		) {
			cleanList.push(element.color);
		}
	}
	return cleanList;
};
module.exports = { removeElemtnsRepeted };
