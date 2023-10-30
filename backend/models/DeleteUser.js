const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const DeleteUserSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Add name"]
        }, 

        ID:{
            type:String
        },

        Email:{
            type:String,
            required:[true,"Pleace enter e mail"],
            unique:true,
            trim:true,
            match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"pleace enter valid email"

            ]

        },

        phone:{
            type:String,
            
        }, 

        UserRole:{
            type:String,
            
        },

        deletedAt: { 
            type: Date,
            default: Date.now 
        }
        

    },

    {
        timestamps:true
    }
);


const DeleteUser = mongoose.model("DeleteUser",DeleteUserSchema)

module.exports = DeleteUser;
