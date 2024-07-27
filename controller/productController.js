// ProductController.js

const Product = require('../model/ProductSchema');

const addProduct = async (req, res) => {
    try {
        const { productImage, productName, description, colors, size, price } = req.body;
        const shopId = req.shopId;
        const shopName = req.shopName;

        if (!productImage || !productName || !description || !colors || !size || !price) {
            return res.status(400).json({ error: 'All product details are required' });
        }

        const newProduct = await Product.create({
            shopId: shopId, shopName, productImage, productName, description, colors, size, price
        });
        console.log(newProduct);
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Failed to add product:', error);
        res.status(500).json({ error: error.message });
    }
};

const getProductsByProductId = async (req, res) => {
    try {
        const shopId = req.shopId;
        const products = await Product.find({ shopId });
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.error('Failed to get products:', error);
        res.status(500).json({ error: error.message });
    }
};

const getProductByShopId = async (req, res) => {
    try {
        const { shopId } = req.body;
        const product = await Product.find({ shopId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log(product)
        res.status(200).json(product);
    } catch (error) {
        console.log('Failed to get product:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteProductByObjectId = async (req, res) => {
    try {
        const { productId } = req.body;
        const shopId = req.shopId;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.shopId !== shopId) {
            return res.status(403).json({ error: 'You do not have permission to delete this product' });
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateProductByObjectId = async (req, res) => {
    try {
        const { productId, productImage, productName, description, colors, size, price } = req.body;
        const shopId = req.shopId;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.shopId !== shopId) {
            return res.status(403).json({ error: 'You do not have permission to update this product' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { productImage, productName, description, colors, size, price },
            { new: true } // This option returns the updated document
        );

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addProduct, getProductsByProductId, getProductByShopId, deleteProductByObjectId, updateProductByObjectId };