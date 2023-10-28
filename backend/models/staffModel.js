const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add first name']
    },
    other: {
        type: String,
        
    },
    address: {
        type: String,
       
    },
    nic: {
        type: String,
      
    },
    contactNo: {
        type: Number,
        required: [true, 'Please add contact number']
    },
    dob: {
        type: String,
       
    },
    email: {
        type: String,
       
    },
    staffId: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        required: [true, 'Please add role']
    }
}, {
    timestamps: true
});

const Staff = mongoose.model("Staff", staffSchema)
module.exports = Staff;