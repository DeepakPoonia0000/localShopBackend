const express = require('express');
const cors = require('cors')
const { addShop, loginShop, verifyToken } = require('./controller/ShopUserController');
const { addProduct , updateProductByObjectId , deleteProductByObjectId , getProductByObjectId , getProductsByProductId } = require('./controller/productController')
const dbConnection = require('./dbConnection')

const app = express();
const PORT = 7000;

dbConnection();

app.use(cors());
app.use(express.json());



app.post('/addShop', addShop);
app.post('/loginShop', loginShop);
app.post('/addProduct', verifyToken, addProduct);
app.get('/products', verifyToken, getProductsByProductId);
app.get('/details', verifyToken, getProductByObjectId);
app.delete('/delete', verifyToken, deleteProductByObjectId);
app.put('/update', verifyToken, updateProductByObjectId);



app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server is running successfully on port ' + PORT);
    } else {
        console.error('Error occurred, server cannot start: ' + error);
    }
});