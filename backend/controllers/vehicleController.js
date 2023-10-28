const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");

// get all the vehicles
const getAllVehicles = asyncHandler(async (req, res) => {
	const fetchVehicles = await Vehicle.find({});

	if (fetchVehicles) {
		res.status(200).json(fetchVehicles);
	} else {
		res.status(400).json({
			message: "Vehicles not found",
			status: "database is empty",
		});
	}
});

//get a single vehicle by vehicleRegNum
const getSingleVehicle = asyncHandler(async (req, res) => {
	const vehicleRegNum = req.params.vehicleRegNum;

	const selectedVehicle = await Vehicle.findOne({ vehicleRegNum});

	if (selectedVehicle) {
		res.status(200).json(selectedVehicle);
	} else {
		res.status(404).json({ message: "Vehicle not found" });
	}
});

// create a new vehicle
const createNewVehicle = asyncHandler(async (req, res) => {
	const {
		name,
		nic,
		address,
		phone,
		vehicleRegNum,
		model,
		capacity,
	} = req.body;

	if (
		name === "" ||
		nic === "" ||
		address === "" ||
		phone === "" ||
		vehicleRegNum === "" ||
		model === "" ||
		capacity === ""
	) {
		res.status(303).json({ message: "Please fill all required field" });
	} else {
		const vehicle = new Vehicle({
			name,
		  nic,
		  address,
		  phone,
		  vehicleRegNum,
		  model,
		  capacity,
		});

		const createdVehicle = await vehicle.save();

		res.json(createdVehicle);
	}
});

// // update method
// const updateVehicle = asyncHandler(async (req, res) => {
// 	const vehicleID = req.params.id;

// 	const selectedVehicle = await Vehicle.find({ vehicleRegNum: vehicleID });

// 	if (selectedVehicle.length !== 0) {
// 		const updatedVehicle = await Vehicle.findByIdAndUpdate(
// 			selectedVehicle[0]._id,
// 			{ $set: req.body },
// 			{ new: true }
// 		);
// 		res.status(201).json(updatedVehicle);
// 	} else {
// 		res.status(404).json({ message: "Vehicle updation failed" });
// 	}
// });


// update method using mongo object id
const UpdateVehicleInfo = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedVehice = await Vehicle.findByIdAndUpdate(id ,{ $set: req.body },{ new: true });

	if (selectedVehice) {
		res.status(201).json(selectedVehice);
	} else {
		res.status(404).json({ message: "Vehicle updation failed" });
	}
});


// vehicle find by mongo object id 
const findVehicle = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedVehicle = await Vehicle.findById(id);

	if (selectedVehicle) {
		res.status(201).json(selectedVehicle);
	} else {
		res.status(404).json({ message: "Vehicle not found" });
	}
});



// delete method
const deleteVehicle = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedVehicle = await Vehicle.findById(id);

	if (selectedVehicle) {
		await Vehicle.deleteOne({ _id: selectedVehicle._id });
		res.status(201).json({ message: "Vehicle removed successfully" });
	} else {
		res.status(404).json({ message: "Vehicle not found" });
	}
});

module.exports = {
	getAllVehicles,
  getSingleVehicle,
  createNewVehicle,
  UpdateVehicleInfo,
  findVehicle,
  deleteVehicle
};
