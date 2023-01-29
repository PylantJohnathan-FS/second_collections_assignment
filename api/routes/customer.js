const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const customer = require('../model/customer');
const Customer = require("../model/customer");


//get list
router.get("/", (req,res,next) => {
    customer.find({})
    .select("firstName lastName phoneNumber _id")
    .exec()
    .then((customers) => {
        if (customers < 1) {
            res.status(200).json({
                message: "No customers listed. Add an customer to the list."
            });
        }
        res.status(200).json({
            message: "customers SUCCESSFULLY retrieved",
            customers,
        });
    })
    .catch(err =>{
        console.log(err.message);
        res.status(501).json({
            error:{
                message: err.message,
                status: err.status,
            }
        })
    });
});

//post or create
router.post("/",(req,res,next) => {
    const newCustomer = new Customer({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    });
    newCustomer.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "New customer POSTED to database",
            customer:{
                Name: result.firstName,
                Surname: result.lastName,
                Contact: result.phoneNumber,
                id: result.id,
                metadata:{
                    method: req.method,
                    host: req.hostname,
                }
            }
        })
    })
    .catch(err =>{
        console.log(err.message);
        res.status(501).json({
            error:{
                message: err.message,
                status: err.status,
            }
        })
    });
});

//get by id
router.get("/:customerId",(req,res,next)=>{
    const customerId = req.params.customerId;
    Customer.findById({
        _id:customerId
    }).then(result => {
        res.status(200).json({
            message: `Customer SUCCESSFULLY retreived.`,
            customer:{
                firstName: result.firstName,
                Surname: result.lastName,
                Contact: result.phoneNumber,
                id: result.id,
                metadata:{
                    method: req.method,
                    host: req.hostname,
                }
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message,
                status: err.status,
            }
        })
    });
});

//patch or update
router.patch("/:customerId",(req,res,next)=>{
    const customerId = req.params.customerId;
    const updatedCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    };
    Customer.updateOne({
        _id:customerId
    }, {
        $set:updatedCustomer
    }).then(result => {
        res.status(200).json({
            message: "Customer UPDATED",
            customer:{
                Name: result.firstName,
                Surname: result.lastName,
                Contact: result.phoneNumber,
                id: result.id,
                metadata:{
                    method: req.method,
                    host: req.hostname,
                }
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message,
                status: err.status,
            }
        })
    });
});

//delete
router.delete("/:customerId",(req,res,next)=>{
    const customerId = req.params.customerId;
    const deleteCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    };
    Customer.findByIdAndDelete({
        _id:customerId
    }, {
        $set:deleteCustomer
    }).then(result => {
        res.status(200).json({
            message: "Customer successfully DELETED",
            customer:{
                Name: result.firstName,
                Surname: result.lastName,
                Contact: result.phoneNumber,
                id: result.id,
                metadata:{
                    method: req.method,
                    host: req.hostname,
                }
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message,
                status: err.status,
            }
        })
    });
});

module.exports = router;