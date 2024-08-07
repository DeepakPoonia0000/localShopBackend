// ownerSchema.js

const mongoose = require('mongoose')

const addUser = new mongoose.Schema({
    email: String,
    name: String,
    shopName: String,
    password: String,
    role:String,
    pincode: Number,
    address: String,
    location: String,
    token: String,
});

const User = mongoose.model('User', addUser);

module.exports = User;