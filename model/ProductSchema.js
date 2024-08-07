// productSchema.js


const mongoose = require('mongoose');

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
    timeOfAdding: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        // default: () => Date.now() + 20 * 1000, // 20 seconds from now
        default: () => Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days from now
        index: { expireAfterSeconds: 0 },
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
