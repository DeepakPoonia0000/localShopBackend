// ownerSchema.js

const mongoose = require('mongoose')

const addShopSchema = new mongoose.Schema({
    email:String,
    shopName: String,
    password: String,
    pincode:String,
    address:String,
    location:String,
    token: String,
});

const Shop = mongoose.model('Shop', addShopSchema);

module.exports = Shop;