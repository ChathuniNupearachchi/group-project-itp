const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel");
const Driver = require("../models/driverModel");

//get all drivers
const fetchDrivers = asyncHandler (async (req, res) => {

  const staffDrivers = await Staff.find({role: 'Driver'});

  if(staffDrivers.length > 0){
    const driversToCreate = [];

    // Create Driver instances from staff members and save them to the database
    for(const Staff of staffDrivers){
      // await Driver.createFromStaff(Staff);
      const newDriver = await Driver.validateAndCreateFromStaff(Staff);

      if (newDriver) {
        driversToCreate.push(newDriver);
      }
      
    }

    //fetch and return the drivers directly from the Driver model
    const drivers = await Driver.find();
    res.status(200).json(drivers);

  }else{
    res.status(404)
    throw new Error({message : "Drivers not found"})
  }

});

//get single driver by id
const getSingleDriver = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedDriver = await Driver.findById(id);

	if (selectedDriver) {
		res.status(201).json(selectedDriver);
	} else {
		res.status(404).json({ message: "Driver not found" });
	}
});

module.exports = {
  fetchDrivers,
  getSingleDriver,
};

