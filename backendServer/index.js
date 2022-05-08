var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');

let dev_db_url = 'mongodb://localhost:27017/shopBridge'
let mongoDB = dev_db_url;

const Mongooptions = {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 
};
mongoose.connect(mongoDB, Mongooptions)
    .then(() => console.log('Connection Successful'))
    .catch((err) => console.error(err)
    );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));

//CONTROLLERS
var productController = require('./controllers/product.controller');

app.get('/', (req, res) => {
    res.json({ info: 'Welcome' })
  })

  const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })
app.get('/getProducts',productController.getProducts);
app.post('/getProductById',productController.getProductById);
app.post('/addProduct',upload.single('file'),productController.addProduct);
app.post('/updateProduct',upload.single('file'),productController.updateProduct);
app.post('/deleteProduct',productController.deleteProduct);
app.post('/deleteProductPermanently',productController.deleteProductPermanently)

app.listen(3000, function () {
    console.log("Server is running")
})