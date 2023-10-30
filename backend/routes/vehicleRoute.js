const express = require("express");
const { createNewVehicle, getAllVehicles, getSingleVehicle, UpdateVehicleInfo, findVehicle, deleteVehicle } = require("../controllers/vehicleController");
const router = express.Router();


router.post("/", createNewVehicle)
router.get("/", getAllVehicles)

//find vehicle by vehicleRegNum
router.get("/:vehicleRegNum", getSingleVehicle)

router.put("/:id", UpdateVehicleInfo)

//find vehicle by using mongo object id
router.get("/mongo/:id", findVehicle)

router.delete("/:id", deleteVehicle)

module.exports = router;

