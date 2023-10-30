const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		nic: {
			type: String,
			required: true,
      unique: true,
		},

		address: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
		},

		vehicleRegNum: {
			type: String,
			required: true,
      unique: true
		},

		model: {
			type: String,
			required: true,
		},

		capacity: {
			type: String,
			required: true,
		},

		availability: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
