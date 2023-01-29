const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const errorTemplate = require('../../templates/errorTemplate');
const motorcycleTemplate = require('../../templates/successTemplate');
const messages = require('../../messages/messages');
const motorcycle = require('../model/motorcycle');
const Motorcycle = require("../model/motorcycle");

//get all
router.get("/", (req,res,next) => {
    motorcycle.find({})
    .select("year make model")
    .exec()
    .then((motorcycles) => {
        if(motorcycles.length === 0){
            res.status(406).json({
                message: messages.empty_motorcycyles_list
            });
        }
        res.status(200).json({
            message: messages.motorcycle_list_retrieved,
            motorcycles,
        });
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.get_all_failed, 500);
    });
})

//post or create
router.post("/",(req,res,next) => {
    Motorcycle.find({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
    })
    .select("year make model")
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json({
                message: messages.motorcycle_exists_error
            })
        }
        const newMotorcycle = new Motorcycle({
            _id: mongoose.Types.ObjectId(),
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
        });
        newMotorcycle.save()
        .then(result => {
            motorcycleTemplate(res, result, messages.new_entry_posted, 200);
        })
        .catch(err =>{
            return errorTemplate(res, err, messages.post_failed, 500);
        });
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.post_failed, 500);
    });
});

//get by /:id
router.get("/:motorcycleId", (req,res,next) => {
    const motorcycleId = req.params.motorcycleId;
    Motorcycle.findById(motorcycleId)
    // .populate()
    .select("year make model")
    .exec()
    .then(result => {
        if(motorcycleId !== result.id){
            console.log(result);
            return res.status(404).json({
                message: messages.entry_not_found
            })
        }
        motorcycleTemplate(res, result, messages.motorcycle_retrieved, 200);
    })
    .catch(err => {
        return errorTemplate(res, err, messages.get_id_failed, 500);
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
    })
    .select("year make model")
    .exec()
    .then(result => {
        motorcycleTemplate(res, result, messages.entry_updated, 200);
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.update_failed, 500);
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
    })
    .select("year make model")
    .exec()
    .then(result => {
        motorcycleTemplate(res, result, messages.entry_deleted, 200);
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.delete_failed, 500);
    });
});

module.exports = router;