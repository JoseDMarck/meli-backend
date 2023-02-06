const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const meliRouters = require("./app/routes/meli");
var cors = require("cors");

//const port = process.env.PORT || 3000;
const hostname = "localhost";
const port = 3001;

// Parsing Json peticiones no mayores a 20mb
app.use(
	bodyParser.json({
		limit: "20mb",
	})
);

app.use(
	bodyParser.urlencoded({
		limit: "20mb",
		extended: true,
	})
);

//CORS
app.use(cors());

//RUTAS:
app.use(meliRouters);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
});
