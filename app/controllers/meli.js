const Service = require("../services/api");
const {
	getDecimals,
	productCondition,
	productCategories,
	productDescription,
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
		let cleanProduct = {
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
				price: {
					currency: product.currency_id,
					amount: product.installments.amount,

					decimals: getDecimals(product.installments.amount),
				},
				picture: product.thumbnail,
				condition: productCondition(product.attributes),
				free_shipping: product.shipping.free_shipping,
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
	let resolve = false;
	let __MELIResponse = await Service("GET", `items/${ID}`);

	if (__MELIResponse.data) {
		let product = __MELIResponse.data;

		var cleanProduct = {
			autor: {
				name: "Jose Ramón", // no encontre este dato :(
				lastname: "Covarrubias Torres", // no encontre este dato :(
			},
			item: {
				id: product.id,
				title: product.title,
				price: {
					currency: product.currency_id,
					amount: product.price,
					decimals: getDecimals(product.price),
				},
				picture: product.secure_thumbnail,
				pictures: product.pictures,
				condition: productCondition(product.attributes),
				free_shipping: product.shipping.free_shipping,
				sold_quantity: product.sold_quantity,
				description: await productDescription(product.id),
			},
		};

		res.status(200).json({
			status: 200,
			message: "Resultados encontrados",
			response: cleanProduct,
		});
	} else
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

/* --------------------------------------------------------
/* ---- SEARCH PRODUCT PAGINATION
-------------------------------------------------------- */

exports.searchProductsPagination = async (req, res) => {
	let query = req.params.q;
	let limit = req.params.limit;
	let offset = req.params.offset;
	let __MELIResponse = await Service(
		"GET",
		`sites/MLA/search?q=${query}&limit=${limit}&offset=${offset}`
	);
	let isResults = __MELIResponse.data.results.length > 0; // Para saber si hay resultados
	let isFilters = __MELIResponse.data.filters.length > 0; // Para saber si hay filtros y sacar categoria

	if (isResults) {
		let cleanProduct = {
			pagination: __MELIResponse.data.paging,
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
				price: {
					currency: product.currency_id,
					amount:
						product?.installments === null
							? product?.price
							: product?.installments?.amount,
					decimals:
						product?.installments === null
							? getDecimals(product?.price)
							: getDecimals(product?.installments?.amount),
				},

				picture: product.thumbnail,
				condition: productCondition(product.attributes),
				free_shipping: product.shipping.free_shipping,
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
