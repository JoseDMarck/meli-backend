exports.showMessage = function (errorData) {
	let dataError;
	console.log(errorData.errno);
	switch (errorData.errno) {
		case 1062:
			dataError = [
				{
					error: true,
					status: "ERROR",
					message: "Error al insertar los datos debido a que ya existe",
					sqlMessage: errorData.sqlMessage,
					errno: errorData.errno,
					code: errorData.code,
				},
			];
			return dataError;

		case 1146:
			dataError = [
				{
					error: true,
					status: "ERROR",
					message: "La tabla consultada no existe en la base de datos",
					sqlMessage: errorData.sqlMessage,
					errno: errorData.errno,
					code: errorData.code,
				},
			];
			return dataError;
		case 0:
			dataError = [
				{
					error: true,
					status: "ERROR",
					message: "No se han encontrado resultados",
					sqlMessage: "404 not found slq",
					errno: 404,
					code: errorData.code,
				},
			];
			return dataError;

		default:
			dataError = [
				{
					error: true,
					status: "ERROR",
					message: `Error MYSQL ${errorData.code}`,
					sqlMessage: errorData.qlMessage,
					errno: 0,
					code: errorData.code,
				},
			];
			return dataError;
	}
};
