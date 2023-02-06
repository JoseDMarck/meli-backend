const express = require("express");
const controller = require("../controllers/meli");
const router = express.Router();
const path = "api";

/* --------------------------------------------------------
/* ---- GET PRODUCTS
-------------------------------------------------------- */
router.get(`/${path}/items/:id`, controller.getProductByID);

module.exports = router;
