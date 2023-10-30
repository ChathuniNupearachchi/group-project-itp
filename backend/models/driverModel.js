const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  staffId: {
    type: String,
    unique: true,
    required : true
},

firstName: {
  type: String,
  required: [true, 'Please add first name']
},

nic: {
  type: String,
},

dob: {
  type: String,
 
},

address: {
  type: String,
 
},

contactNo: {
  type: Number,
  required: [true, 'Please add contact number']
},

availability: {
  type: Boolean,
  default: true
}
},{
  timestamps: true
});

const Driver = mongoose.model("Driver", driverSchema);

// Function to create a Driver instance from a staff member object
Driver.createFromStaff = async (Staff) => {
  
  const driverData = {
    staffId: Staff.staffId,
    firstName: Staff.firstName,
    // nic: Staff.nic,
    dob: Staff.dob,
    address: Staff.address,
    contactNo: Staff.contactNo,
    availability: true, 
  };

  const driver = new Driver(driverData);
  await driver.save();
  return driver;
};

// Validation method to check if staffId already exists in the Driver collection
Driver.validateAndCreateFromStaff = async (Staff) => {
  const existingDriver = await Driver.findOne({ staffId: Staff.staffId });

  if (existingDriver) {
    // StaffId already exists in the Driver collection, skip the data set
    // console.log(`Staff ID '${Staff.staffId}' already exists in the Driver collection. Skipping data set.`);
    return null;
  } else {
    // StaffId is unique, create a new Driver instance
    return Driver.createFromStaff(Staff);
  }
};




module.exports = Driver;