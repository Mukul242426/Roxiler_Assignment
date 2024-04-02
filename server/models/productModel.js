import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    id: {
        type:Number,
        unique:true
    },
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: String
})

export const Product=mongoose.model('Product',productSchema)