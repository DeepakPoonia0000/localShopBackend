const mongoose = require('mongoose')

const addShopSchema = new mongoose.Schema({
    email:String,
    shopName: String,
    password: String,
    token: String,
});

const Shop = mongoose.model('Shop', addShopSchema);

module.exports = Shop;