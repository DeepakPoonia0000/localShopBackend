const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Shop = require('../model/OwnerSchema')

const jwtSecret = 'Thr0bZyphrnQ8vkJumpl3BaskEel@ticsXzylN!gmaPneuma';

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;


    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        const shop = await Shop.findById(decodedToken.id);

        if (!shop || shop.token !== token) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.shopId = decodedToken.id;
        next();
    } catch (error) {
        console.error('Failed to verify token:', error);
        return res.status(500).json({ message: 'Failed to verify token', error: error.message });
    }
};


const addShop = async (req, res) => {
    try {
        const { email, shopName, password } = req.body;
        if (!shopName || !password || !email) {
            return res.status(400).json({ error: 'Name and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newShop = await Shop.create({ email, shopName, password: hashedPassword });
        console.log(newShop)
        res.status(201).json({ newShop });
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ error: error.message });
    }
};

const loginShop = async (req, res) => {
    try {
        const { email, password } = req.body;
        const shop = await Shop.findOne({ email });

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, shop.password);

        if (isPasswordValid) {
            const token = jwt.sign({ id: shop._id }, jwtSecret, { expiresIn: '100d' });
            shop.token = token;
            await shop.save();
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addShop, loginShop, verifyToken };