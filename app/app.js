const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const {connect} = require("../db/db");
const customerRouter = require("../api/routes/customer");
const motorcycleRouter = require("../api/routes/motorcycle");

//middleware for logging
app.use(morgan("dev"))

//middleware that all requests are json (contract)
app.use(express.json());

//urlencoding
app.use(express.urlencoded({
    extended: true
}));

//middleware for cors using cors package
app.use(cors())

//middleware for health check actuator
app.get("/", (req,res,next) => {
    res.status(200).json({message: "Service is UP!",
    method: req.method
    });
});

//router(s)
app.use("/customers", customerRouter);
app.use("/motorcycles", motorcycleRouter);

//middleware for errors and bad urls
app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error:{
            message: error.message,
            status: error.status,
        },
    });
});

// //connect to mongodb via mongoose
connect();

module.exports = app;