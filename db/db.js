const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    console.log("REAL connection");
    return await mongoose.connect(process.env.mongoDBURL, (err)=>{
        if(err){
            console.error("Error: ", err.message);
        }
        else{
            console.log("MongoDB REAL connection SUCCESSFUL");
        }
    });
};

const savePost = async (newPost) => {
    console.log("Saving REAL posts");
    return await newPost.save();
};

const disconnect = async () => {
    console.log("MongoDB REAL disconnection SUCCESSFUL")
    await mongoose.connection.close();
};

module.exports = {connect, savePost, disconnect };