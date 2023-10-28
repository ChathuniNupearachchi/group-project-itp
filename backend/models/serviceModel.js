const mongoose = require("mongoose");



const serviceSchema = mongoose.Schema({
    productID: {
        type: String,
        unique: true,
    },
    cusID: {
        type: String,
        required: [true, 'Please add service name']
    },
    cusEmail: {
        type: String,
        required: [true, 'Please add service charge']
    },
    qty: {
        type: String,
        required: [true, 'Please add service description']
    },
    /*serviceImage: {
        type: String,
        required: [true, 'Please add service image']
    },*/
    cType: {
        type: String,
        required: [true, 'Please add service complaint type']
    },
    description: {
        type: String,
        required: [true, 'Please add service description']
    },
}, {
    timestamps: true
})
serviceSchema.index({
    productID:'text',
    cusID:'text'
})




module.exports = mongoose.model('Service', serviceSchema);
