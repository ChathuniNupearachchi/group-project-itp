const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    name: {
        type:String,
        required : [true, "Please add a name"],
        trim : true
    },

    sku: {
        type:String,
        required : [true],
        default: "SKU",
        trim : true
    },
    category: {
        type:String,
        required : [true,"Please add a category"],
        trim : true
    },
    quantity: {
        type:String,
        required : [true,"Please add a quantity"],
        trim : true
    },
    price: {
        type:String,
        required : [true,"Please add a price"],
        trim : true
    },
    value: {
        type:String,
        required : [true,"Please add a price"],
        trim : true
    },

    location:{
        type:String,
        required:[true,"Please add a location"],
        trim:true

    },
    
    description: {
        type:String,
        required : [true,"Please add a description"],
        trim : true
    },

    /*image: {
        type:Object,
        default :{}
        
    },*/
},{
    timestamps : true,
}



);
productSchema.index({
    name:'text',
    sku:'text',
    category:'text',
    quantity:'text',
    price:'text',
    value:'text',
    location:'text',
    description:'text',
    
     
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;