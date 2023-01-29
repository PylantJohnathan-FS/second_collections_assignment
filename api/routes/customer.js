const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const messages = require('../../messages/messages');
const errorTemplate = require('../../templates/errorTemplate');
const customerTemplate = require('../../templates/successTemplate');
const customerDeletedTemplate = require('../../templates/successTemplate');
const customer = require('../model/customer');
const Customer = require("../model/customer");


//get list
router.get("/", (req,res,next) => {
    customer.find({})
    .select("firstName lastName motorcycle _id")
    .exec()
    .then((customers) => {
        if(customers.length === 0){
             /* 406 Not Acceptable
            This response is sent when the web server, after performing server-driven
            content negotiation, doesn't find any content that conforms to the criteria
            given by the user agent. */
            res.status(406).json({
                message: messages.empty_customers_list
            });
        }
        res.status(200).json({
            message: messages.customer_list_retrieved,
            customers,
        });
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.get_all_failed, 500);
    });
});

//post or create
router.post("/", (req,res,next) =>{
    Customer.find({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        motorcycle: req.body.motorcycle,
    })
    // .exec() not necessary for post aka save because these are true promises.
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json({
                message: messages.customer_exists_error
            })
        }
        const newCustomer = new Customer({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            motorcycle: req.body.motorcycle,
        });
        newCustomer.save()
        .then(result => {
            customerTemplate(res, result, messages.new_entry_posted, 200);
        })
        .catch(err => {
            return errorTemplate(res, err, messages.post_failed, 500);
        });
    })
    .catch(err => {
        return errorTemplate(res, err, messages.post_failed,500);
    });
});

//get by id
router.get("/:customerId",(req,res,next)=>{
    const customerId = req.params.customerId;
    Customer.findById(customerId)
    .populate('motorcycle')
    .exec()
    .then(result => {
        if(!result){
            console.log(result);
            return res.status(404).json({
                message: messages.entry_not_found
            })
        }
        customerTemplate(res, result, messages.customer_retrieved, 200);
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.get_id_failed, 500);
    });
});

//patch or update
/* I do not understand why customer results are not coming back. I can use req.body.----
to display what the input was but cannot show what the new database entry looks like with
resut.----- */
router.patch("/:customerId",(req,res,next)=>{
    const customerId = req.params.customerId;
    const updatedCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        motorcycle: req.body.motorcycle,
    };
    Customer.updateOne({
        _id:customerId
    }, {
        $set:updatedCustomer
    })
    .exec()
    .then(result => {
        customerTemplate(res, result, messages.entry_updated, 200);
        /* res.status(200).json({
            message: messages.entry_updated,
            customer:{
                Name: result.firstName,
                Surname: result.lastName,
                motorcycle: result.motorcycle,
                id: result.id,
                metadata:{
                    method: req.method,
                    host: req.hostname,
                }
            }
        }) */
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.update_failed, 500);
    });
});

//delete
router.delete("/:customerId",(req,res,next)=>{
    const customerId = req.params.customerId;
    const deleteCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        motorcycle: req.body.motorcycle,
    };
    Customer.findByIdAndDelete({
        _id:customerId
    }, {
        $set:deleteCustomer
    })
    .exec()
    .then(result => {
        customerDeletedTemplate(res, result, messages.entry_deleted, 200);
    })
    .catch(err =>{
        return errorTemplate(res, err, messages.delete_failed, 500);
    });
});

module.exports = router;