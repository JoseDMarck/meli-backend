const Service = require("../services/api");

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
				categories.push(cat.name);
			});
		});

		return categories;
	}
};

/* --------------------------------------------------------
/* ---- GET PRODUCT DESCRIPTION 
-------------------------------------------------------- */

exports.productDescription = async (productID) => {
	let __MELIResponse = await Service("GET", `items/${productID}/description`);
	if (__MELIResponse.data) {
		let description = __MELIResponse.data.plain_text;

		return description;
	}
};
