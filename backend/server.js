const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require ("./middleWare/errorMiddleWare")
const cookieParser = require("cookie-parser")
const path =require("path");

const userRoute = require("./routes/userRoute")

const supplierRoutes = require('./routes/supplierRoutes');
const payrollRoutes = require('./routes/payrollRoutes')

 //Staff managemant
 const staffRoutes = require('./routes/staffRoutes')
 //leave management
 const leaveRoutes = require('./routes/leaveRoutes')
 //payroll management
 const staffpayrollRoutes = require('./routes/staffPayrollRoutes')

 //inventory
 const productRoute = require("./routes/InventoryproductRoute")

 //order routes
 const orderRoute = require("./routes/orderRoute");

//dilivary managemant
const vehicleRoute = require("./routes/vehicleRoute");
const driverRoute = require("./routes/driverRoute");
const delivarystaffRoute = require("./routes/dilivaryStaffRoute");
const delivaryorderRoute = require("./routes/dilivaryOrderRoute");

//service managemant
const serviceRoutes = require('./routes/serviceRoutes')


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
    //user routes
app.use("/api/users",userRoute)

    //Supplier routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/payroll', payrollRoutes);

    //ftaff managemat
//staff management
app.use('/api/staff', staffRoutes);
//leave management
app.use('/api/leave', leaveRoutes);
//payroll management
app.use('/api/staffpayroll', staffpayrollRoutes);


        //dilevary managemat
app.use("/api/vehicles", vehicleRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/delivarystaff", delivarystaffRoute);
app.use("/api/delivaryorders", delivaryorderRoute);


    //order managemant
app.use("/api/orders", orderRoute);




    //Inventory
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/api/products",productRoute);


    //Refund managemant
app.use('/api/services', serviceRoutes);



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
