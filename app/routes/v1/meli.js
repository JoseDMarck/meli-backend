const express = require("express");
const controller = require("../../controllers/meli");

const router = express.Router();
const path = "api/v1";

/* --------------------------------------------------------
/* ---- SEARCH PRODUCT
-------------------------------------------------------- */
/**
 * @openapi
 * /api/v1/items/search/iphone:
 *   get:
 *     tags:
 *       - Search Product
 *     parameters:
 *       - in: product name
 *         name: iphone
 *         schema:
 *           type: string
 *         description: Nombre del producto que desea buscar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *
 */
router.get(`/${path}/items/search/:q`, controller.searchProducts);

/* --------------------------------------------------------
/* ---- GET PRODUCTS BY ID
-------------------------------------------------------- */
/**
 * @openapi
 * /api/v1/items/MLA1308344154:
 *   get:
 *     tags:
 *       - Search Product
 *     parameters:
 *       - in: Product ID
 *         name: MLA1308344154
 *         schema:
 *           type: string
 *         description: Nombre del producto que desea buscar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *
 */
router.get(`/${path}/items/:id`, controller.getProductByID);

/* --------------------------------------------------------
/* ---- GET PRODUCTS DESCRIPTION BY ID 
-------------------------------------------------------- */
/**
 * @openapi
 * /api/v1/items/MLA1308344154/description:
 *   get:
 *     tags:
 *       - Search Product
 *     parameters:
 *       - in: MLA1308344154
 *         name: Product ID
 *         schema:
 *           type: string
 *         description: Nombre del producto que desea buscar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *
 */
router.get(
	`/${path}/items/:id/description`,
	controller.getProductDescriptionByID
);

/* --------------------------------------------------------
/* ---- SEARCH PRODUCT pagination
-------------------------------------------------------- */
/**
 * @openapi
 * /api/v1/items/search/pagination/iphone/4/0:
 *   get:
 *     tags:
 *       - Search Product
 *     parameters:
 *       - in: product name
 *         name: iphone
 *         schema:
 *           type: string
 *         description: Nombre del producto que desea buscar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *
 */
router.get(
	`/${path}/items/search/pagination/:q/:limit/:offset`,
	controller.searchProductsPagination
);

module.exports = router;
