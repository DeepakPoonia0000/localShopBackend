// server.js

const express = require('express');
const cors = require('cors')
const { addShop, loginShop, verifyToken , } = require('./controller/ShopController');
const {  verifyTokenCust, getShops, addCustomer, loginCustomer } = require('./controller/customerController');
const { addProduct , updateProductByObjectId , deleteProductByObjectId ,  getProductsByProductId, getProductByShopId } = require('./controller/productController')
const dbConnection = require('./dbConnection')

const app = express();
const PORT = 7000;

dbConnection();

app.use(cors());
app.use(express.json());



app.post('/addShop', addShop);
app.post('/addCustomer', addCustomer);
app.post('/loginShop', loginShop);
app.post('/loginCustomer', loginCustomer);
app.post('/addProduct', verifyToken, addProduct);
app.get('/products', verifyToken, getProductsByProductId);



app.delete('/delete', verifyToken, deleteProductByObjectId);
app.put('/update', verifyToken, updateProductByObjectId);



app.get('/details', verifyTokenCust, getProductByShopId);
app.get('/shops', verifyTokenCust, getShops);




app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server is running successfully on port ' + PORT);
    } else {
        console.error('Error occurred, server cannot start: ' + error);
    }
});