const express = require("express");
const registerStaff = require("../controllers/staffcontroller");
const router = express.Router();

router.post("/", registerStaff);

module.exports = router;