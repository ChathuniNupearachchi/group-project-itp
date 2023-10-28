const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
// const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const vehicleRoute = require("./routes/vehicleRoute");
const driverRoute = require("./routes/driverRoute");
const staffRoute = require("./routes/staffRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/vehicles", vehicleRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/staff", staffRoute);
app.use("/api/orders", orderRoute);

app.use(errorHandler);

//connect to mongodb
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

