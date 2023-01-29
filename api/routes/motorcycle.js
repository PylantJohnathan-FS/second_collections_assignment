const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const motorcycle = require('../model/motorcycle');
const Motorcycle = require("../model/motorcycle");


/* router.get("/",(req,res,next)=>{
    res.json({message:"Motorcycles - GET"
    })
}); */

router.get("/", (req,res,next) => {
    motorcycle.find({})
    .select("year make model _id")
    .exec()
    .then((motorcycles) => {
        if(motorcycles.length === 0){
            res.status(406).json({
                message: "No motorcycles listed. Add motorcycles to list."
            });
        }
        res.status(200).json({
            message: "Motorcycles SUCCESSFULLY retrieved",
            motorcycles,
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
})

//post or create
router.post("/",(req,res,next) => {
    Motorcycle.find({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            /* 406 Not Acceptable
            This response is sent when the web server, after performing server-driven
            content negotiation, doesn't find any content that conforms to the criteria
            given by the user agent. */
            return res.status(406).json({
                message: "Motorcycle is already listed"
            })
        }
        const newMotorcycle = new Motorcycle({
            _id: mongoose.Types.ObjectId(),
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
        });
        newMotorcycle.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Motorcycle POSTED to database",
    
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
    })
    .catch(err =>{
        console.log(err.message);
        res.status(500).json({
            error:{
                message: `Unable to save motorcycle with year: ${req.body.year}, make: ${req.body.make}, model:${req.body.year} provided.`
            }
        })
    })
});

router.get("/:motorcycleId",(req,res,next)=>{
    const motorcycleId = req.params.motorcycleId;
    Motorcycle.findById({
        _id:motorcycleId
    }).then(result => {
        res.status(200).json({
            message: `Motorcycle id:${motorcycleId} SUCCESSFULLY retreived.`,
            motorcycle:{
                year: result.year,
                make: result.make,
                model: result.model,
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
router.patch("/:motorcycleId",(req,res,next)=>{
    const motorcycleId = req.params.motorcycleId;
    const updatedMotorcycle = {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
    };
    Motorcycle.updateOne({
        _id:motorcycleId
    }, {
        $set:updatedMotorcycle
    }).then(result => {
        res.status(200).json({
            message: "Motorcycle UPDATED",
            motorcycle:{
                year: result.year,
                make: result.make,
                model: result.model,
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
router.delete("/:motorcycleId",(req,res,next)=>{
    const motorcycleId = req.params.motorcycleId;
    const deleteMotorcycle = {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
    };
    Motorcycle.findByIdAndDelete({
        _id:motorcycleId
    }, {
        $set:deleteMotorcycle
    }).then(result => {
        res.status(200).json({
            message: "Motorcycle successfully DELETED",
            motorcycle:{
                year: result.year,
                make: result.make,
                model: result.model,
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