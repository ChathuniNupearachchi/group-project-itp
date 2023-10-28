const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },

    token:{
        type:String,
        required:true
    },

    CreatedAt:{
        type:Date,
        required:true,

    },

    expirsAt:{
        type:Date,
        required:true,
    },

})

const TokenModel = mongoose.model("Token",tokenSchema)
module.exports = TokenModel


//npm i nodemailer