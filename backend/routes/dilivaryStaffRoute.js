const express = require("express");
const registerStaff = require("../controllers/dilivaryStaffController");
const router = express.Router();

router.post("/", registerStaff);

module.exports = router;