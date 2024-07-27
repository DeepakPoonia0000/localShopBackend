// customerController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../model/CustomerSchema')
const Shop = require('../model/OwnerSchema')

const jwtSecretCust = 'Tkjnsadf&@#$^smegn*^$javijnJHBIBUNoion6546ib$';

const verifyTokenCust = async (req, res, next) => {
    const token = req.headers.authorization;


    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecretCust);
        const customer = await Customer.findById(decodedToken.id);

        if (!customer) {
            return res.status(401).json({ message: 'Invalid Customer' });
        }

        if (customer.token !== token) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.shopId = decodedToken.id;
        console.log("token verified successfully")
        next();
    } catch (error) {
        console.error('Failed to verify token:', error);
        return res.status(500).json({ message: 'Failed to verify token', error: error.message });
    }
};



const addCustomer = async (req, res) => {
    try {
        const { email, name, password} = req.body;
        if (!name || !password || !email ) {
            return res.status(400).json({ error: 'All fields are necessary!!' });
        }

        const existingEmail = await Customer.findOne({ email });
        const existingEmail0 = await Shop.findOne({ email });
        if (existingEmail || existingEmail0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const existingShopName = await Customer.findOne({ name });
        if (existingShopName) {
            return res.status(400).json({ error: 'User name already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = await Customer.create({ email, name, password: hashedPassword });
        console.log(newCustomer)
        res.status(201).json({ newCustomer });
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ error: error.message });
    }
};




const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(404).json({ error: 'account not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (isPasswordValid) {

            const token = jwt.sign({ id: customer._id }, jwtSecretCust, { expiresIn: '100d' });
            customer.token = token;
            await customer.save();
            console.log("Customer customer", customer)
            return res.status(200).json({ message: 'Login successful', token });

        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: error.message });
    }
};

const getShops = async (req, res) => {
    try {
        const shops = await Shop.find({}, 'shopName address pincode');
        if (shops.length === 0) {
            return res.status(404).json({ error: 'No Shop found' });
        }
        console.log(shops);
        res.status(200).json(shops);
    } catch (error) {
        console.log('Failed to get shops:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {addCustomer,loginCustomer,getShops,verifyTokenCust}