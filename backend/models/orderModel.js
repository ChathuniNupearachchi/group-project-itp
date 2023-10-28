const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({

    OrderID: {
        type: String,
    },

    userID: {
        type: String,
        required: true,
        unique : true,
    },

    userName: {
        type: String,
        required: true,
    },
    
    // orderItems: [
    //     {
    //         name: {type: String, required: true},
    //         qty: {type: Number, required: true},
    //         image: {type: String, required: true},
    //         price: {type: Number, required: true},
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             required: true,
    //             ref: 'Product',
    //         },
    //     },
    // ],

    shippingAddress: {
        address: { type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
    },

    // paymentMethod: {
    //     type: String,
    //     required: true,
    // },

    // paymentResult: {
    //     id: {type: String},
    //     status: {type: String},
    //     update_time: {type: String},
    //     email_address: {type: String},
    // },

    // itemsPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0,
    // },

    // taxPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0,
    // },

    // shippingPrice: {
    //     type: Number,
    //     required: true,
    //     fefault: 0.0,
    // }, 

    // totalPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0,
    // },
    
    // isPaid: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },

    // paidAt: {
    //     type: Date,
    // },

    // isDelivered: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },

    // deliveredAt: {
    //     type: Date,
    // },

    OrderStatus:{
        type:String,
        default:"Pending",
    },
    // accepted: {
    //     type: Boolean,
    //     default: false,
    //   },
      
    //   rejected: {
    //     type: Boolean,
    //     default: false,
    //   },

    assignedDriver:{
        staffId: {type:String},
        firstName: {type:String},
    },

    assignedVehicle:{
        vehicleRegNum: {type:String},
    },

    departureDate:{
        type: Date
    },

    deliveredDate:{
        type: Date
    },

},{
    timestamps: true,
});

// // Add a setter for isDelivered
// orderSchema.path("isDelivered").set(function (value) {
//     if (value && this.isModified("isDelivered")) {
//       // If isDelivered is set to true and has been modified,
//       // update orderState to "Processing"
//       this.OrderStatus = "Processing";
//     }
//     return value;
//   });





const Order=mongoose.model("Order",orderSchema)
module.exports=Order