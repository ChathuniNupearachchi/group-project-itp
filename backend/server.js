const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoute = require("./routes/productRoute")
const path =require("path");
const app= express()

//Middlewares 

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

//Router Middlewares
app.use("/api/products",productRoute);

//Routes
app.get("/",(req, res) => {
    res.send("Home Page");
})



const PORT = process.env.PORT || 4000 ;

//Connect to DB  and start server

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((error)=>console.log(error));