require("dotenv").config({ path: ".env.production" });
const axios = require("axios");
const api_base = process.env.MELI_API;

const config = () => {
	return {
		headers: {
			"Content-Type": "application/json",
		},
	};
};

const Service = (method, service, body) => {
	var url = `${api_base}/${service}`;
	switch (method) {
		case "GET":
			return axios
				.get(url, config())
				.then((res) => {
					//return response(res)
					return res;
				})
				.catch((err) => {
					return err;
				});

		case "POST":
			return axios
				.post(url, body, config())
				.then((res) => {
					//return response(res)
					return res;
				})
				.catch((err) => {
					return err;
				});

		case "PUT":
			return axios
				.put(url, body, config())
				.then((res) => {
					//return response(res)
					return res;
				})
				.catch((err) => {
					return err;
				});

		case "DELETE":
			break;

		default:
			break;
	}
};

module.exports = Service;
