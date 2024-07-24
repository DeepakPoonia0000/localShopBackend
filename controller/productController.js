const Product = require('../model/ProductSchema');

const addProduct = async (req, res) => {
    try {
        const { productImage, productName, description, colors, size, price } = req.body;
        const shopId = req.shopId;

        if (!productImage || !productName || !description || !colors || !size || !price) {
            return res.status(400).json({ error: 'All product details are required' });
        }

        const newProduct = await Product.create({
            productId: shopId, productImage, productName, description, colors, size, price
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
        const products = await Product.find({ productId: shopId });

        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.error('Failed to get products:', error);
        res.status(500).json({ error: error.message });
    }
};

const getProductByObjectId = async (req, res) => {
    try {
        const product = await Product.find();

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
        const { objectId } = req.body;

        const deletedProduct = await Product.findByIdAndDelete({_id:objectId});

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateProductByObjectId = async (req, res) => {
    try {
        const { objectId, productImage, productName, description, colors, size, price } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            {_id:objectId},
            { productImage, productName, description, colors, size, price }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProduct, getProductsByProductId, getProductByObjectId, deleteProductByObjectId, updateProductByObjectId };
