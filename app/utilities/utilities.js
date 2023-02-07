/* --------------------------------------------------------
/* ---- GET DECIMALS
-------------------------------------------------------- */

exports.getDecimals = (value) => {
	if (Number.isInteger(value)) {
		return 0;
	}

	const convertToSting = value.toString().split(".")[1];
	return Number(convertToSting);
};

/* --------------------------------------------------------
/* ---- GET PRODUCT CONDITION
-------------------------------------------------------- */

exports.productCondition = (data) => {
	if (data === undefined || data === null) {
		return "Sin condici´ón";
	} else {
		let index = data.findIndex((p) => p.id == "ITEM_CONDITION");
		let condition = data[index].value_name;
		return condition;
	}
};

/* --------------------------------------------------------
/* ---- GET PRODUCT CATEGORIES
-------------------------------------------------------- */

exports.productCategories = (data) => {
	if (data === undefined || data === null) {
		return "Sin categorías";
	} else {
		let categories = [];
		data.map((filter, i) => {
			filter.path_from_root.map((cat, i) => {
				console.log("cat ***", cat.name);
				categories.push(cat.name);
			});
		});

		return categories;
	}
};
