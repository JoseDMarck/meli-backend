const Service = require("../services/api");

exports.getProductByID = async (req, res) => {
	const body = req.body;
	const ID = req.params.id;
	console.log("ID: ", ID);

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
			message: "No se concotraron productos",
		});
};
