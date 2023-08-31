const removeElemtnsRepeted = (array) => {
	const cleanList = [];
	for (element of array) {
		if (!cleanList.includes(element)) {
			cleanList.push(element);
		}
	}
	return cleanList;
};
module.exports = { removeElemtnsRepeted };
