// productSchema.js

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    shopId: String,
    shopName: String,
    productImage: [String],
    productName: String,
    description: String,
    colors: [String],
    size: [Number],
    price: Number,
    stock: Number,
    timeOfAdding: String
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;