const Service = require("../services/api");
const {
	getDecimals,
	productCondition,
	productCategories,
} = require("../utilities/utilities");
/* --------------------------------------------------------
/* ---- SEARCH PRODUCT
-------------------------------------------------------- */

exports.searchProducts = async (req, res) => {
	let query = req.params.q;
	let __MELIResponse = await Service("GET", `sites/MLA/search?q=${query}`);
	let isResults = __MELIResponse.data.results.length > 0; // Para saber si hay resultados
	let isFilters = __MELIResponse.data.filters.length > 0; // Para saber si hay filtros y sacar categoria

	if (isResults) {
		var cleanProduct = {
			autor: {
				name: "Jose Ramón", // no encontre este dato :(
				lastname: "Covarrubias Torres", // no encontre este dato :(
			},
			items: [],
			categories: [],
		};

		if (isFilters) {
			cleanProduct.categories = productCategories(
				__MELIResponse.data.filters[0].values
			);
		}

		__MELIResponse.data.results.map((product, i) => {
			// ITEMS
			let item = {
				id: product.id,
				title: product.title,
				price: [
					{
						currency: product.currency_id,
						amount: product.installments.amount,
						decimals: getDecimals(product.installments.amount),
					},
				],
				piture: product.thumbnail,
				condition: productCondition(product.attributes),
				free_shipping: true,
			};

			cleanProduct.items.push(item);
		});
		res.status(200).json({
			status: 200,
			message: "Resultados encontrados",
			response: cleanProduct,
		});
	} else
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
