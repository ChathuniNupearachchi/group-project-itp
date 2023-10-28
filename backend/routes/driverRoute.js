const express = require("express");
const {fetchDrivers, getSingleDriver} = require("../controllers/driverController");
const router = express.Router();

router.get("/", fetchDrivers);
router.get("/:id", getSingleDriver);

module.exports = router;