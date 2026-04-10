import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    catogary: {
        type: String
    }

});