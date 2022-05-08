const Products = require('../models/product.model')
const mongoose = require('mongoose');

exports.getProducts = (req, res) => {
    try {
            Products.find({active:true}).sort({ createdAt: -1 }).then(products => {
                res.json({ products })
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getProductById = (req, res) => {
    Products.findById(req.body.productID, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(docs)
        }
    });
};
exports.addProduct = (req, res) => {
    const file = req.file;
    var product = new Products({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        imageUrl: `uploads/${file.filename}`
    });
    product.save((err, doc) => {
        if (err) {
            console.log(err)
        }
        res.send(doc)
    });
};

exports.updateProduct = (req, res) => {
    try {
        Products.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.body.productID) }, { $set: req.body  }).then(data => {
            res.send(data);
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteProduct = (req, res) => {
    try {
        console.log(req.body);
        Products.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.body.productID) }, { $set: {active: false}  }).then(data => {
            res.send(data);
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteProductPermanently = (req, res) => {
    try {
        Products.deleteOne({ _id: mongoose.Types.ObjectId(req.body.productID) }).then(data => res.send(data))
    } catch (err) {
        console.log(err)
    }
}