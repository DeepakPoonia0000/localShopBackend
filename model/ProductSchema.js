const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId:String,
    productImage:[String],
    productName:String,
    description:String,
    colors:[String],
    size:[Number],
    price:Number,
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;