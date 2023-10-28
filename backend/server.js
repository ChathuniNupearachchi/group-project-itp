const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const errorHandler = require ("./middleWare/errorMiddleWare")
const cookieParser = require("cookie-parser")

//"nodemon": "^3.0.1"
const app = express();


// app.get("/",(req,res)=>{
//     res.send("Home page");
// })

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["http://localhost:3000","https://pinvent-app.vercel.app"],
        credentials: true,
    }
));

//route midleware
app.use("/api/users",userRoute)

//error midleware
app.use(errorHandler);


//connect DB
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`server Running is port ${PORT}`);
        })
    })
    .catch((err)=>console.log(err))
