const Service = require("../services/api");

/* --------------------------------------------------------
/* ---- SEARCH PRODUCT
-------------------------------------------------------- */

exports.searchProducts = async (req, res) => {
	let query = req.params.q;
	let __MELIResponse = await Service("GET", `sites/MLA/search?q=${query}`);

	if (__MELIResponse.data)
		res.status(200).json({
			status: 200,
			message: "Resultados encontrados",
			response: __MELIResponse.data,
		});
	else
		res.status(200).json({
			status: 404,
			message: "No se concotraron productos",
		});
};

/* --------------------------------------------------------
/* ---- GET PRODUCTS BY ID
-------------------------------------------------------- */

exports.getProductByID = async (req, res) => {
	let ID = req.params.id;
	let __MELIResponse = await Service("GET", `items/${ID}`);

	if (__MELIResponse.data)
		res.status(200).json({
			status: 200,
			message: "Resultados encontrados",
			response: __MELIResponse.data,
		});
	else
		res.status(200).json({
			status: 404,
			message: "No se encontraron productos",
		});
};

/* --------------------------------------------------------
/* ---- GET PRODUCTS DESCRIPTION BY ID 
-------------------------------------------------------- */

exports.getProductDescriptionByID = async (req, res) => {
	let ID = req.params.id;
	let __MELIResponse = await Service("GET", `items/${ID}/description`);

	if (__MELIResponse.data)
		res.status(200).json({
			status: 200,
			message: "Resultados encontrados",
			response: __MELIResponse.data,
		});
	else
		res.status(200).json({
			status: 404,
			message: "No se encontraron productos",
		});
};
