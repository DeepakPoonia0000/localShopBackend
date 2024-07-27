// customerSchema.js

const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    email:String,
    name: String,
    password: String,
    role:String,
    token: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;