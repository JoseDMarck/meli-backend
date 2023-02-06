const express = require("express");
const controller = require("../controllers/users");
const router = express.Router();
const path = "users";

/* --------------------------------------------------------
/* ---- GET users
-------------------------------------------------------- */
router.get(`/${path}`, controller.getAllUsers);

module.exports = router;
