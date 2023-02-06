const express = require("express");
const controller = require("../controllers/meli");
const router = express.Router();
const path = "api";

/* --------------------------------------------------------
/* ---- SEARCH PRODUCT
-------------------------------------------------------- */
router.get(`/${path}/items/search/:q`, controller.searchProducts);

/* --------------------------------------------------------
/* ---- GET PRODUCTS BY ID
-------------------------------------------------------- */
router.get(`/${path}/items/:id`, controller.getProductByID);

/* --------------------------------------------------------
/* ---- GET PRODUCTS DESCRIPTION BY ID 
-------------------------------------------------------- */
router.get(
	`/${path}/items/:id/description`,
	controller.getProductDescriptionByID
);

module.exports = router;
