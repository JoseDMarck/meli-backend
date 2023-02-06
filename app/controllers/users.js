exports.getAllUsers = (req, res) => {
	const body = req.body;
	res.status(200).json({
		status: 200,
		message: "Usuarios encontrados",
	});
};
