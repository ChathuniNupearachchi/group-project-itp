const Staff = require('../models/staffModel');
const asyncHandler = require("express-async-handler");


const registerStaff = asyncHandler( async (req, res) => {

  const {
  firstName,
  other,
  address,
  nic,
  contactNo,
  dob,
  email,
  staffId,
  role
  } = req.body;

  //create user
  const newStaff = await Staff.create({
    firstName,
      other,
      address,
      nic,
      contactNo,
      dob,
      email,
      staffId,
      role
  });

  res.status(201).json(newStaff);

  
}); 

module.exports = registerStaff;