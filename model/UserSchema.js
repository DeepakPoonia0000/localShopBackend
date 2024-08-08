// ownerSchema.js

const mongoose = require('mongoose')

const addUser = new mongoose.Schema({
    email: String,
    name: String,
    shopName: String,
    password: String,
    role: String,
    pincode: Number,
    address: String,
    location:{
        longitude:String,
        latitude:String
    },
    token: String,
    dateOfRegister: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', addUser);

module.exports = User;