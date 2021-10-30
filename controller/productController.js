const Product = require('../modules/Product');

const createProduct = async (req, res) => {
    console.log('enter function create Product 1');
    if (req.admin) {
        if( req.body.group === 'laptops' || req.body.group === 'desktops' || req.body.group === 'accessories' || req.body.group === 'others') {
        try {
            console.log('enter function create Product 2');
            let newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                group: req.body.group,
                img: req.body.img,
            });
            await newProduct.save();
            res.status(200).json(newProduct);
        } catch (error) {
            res.status(404).send(error.massage);
        }
    } else {
        res.status(400).json({error : "group isn't from the list"})
    }
    } else {
        res.status(400).json({error : "just admin can enter"})
    }
}

const getAllProducts = (req, res) => {
    //all
    Product.find()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).send(err.massage)
        })
}

const deleteProduct = (req, res) => {
    //admin
    Product.findByIdAndRemove(req.body.productId)
        .then((response) => {
            if (response)
                res.status(200).json({ message: `delete product` });
            else
                throw error
        })
}

const updateProduct = (req, res) => {
    //admin
    Product.updateOne({_id: req.uid} , req.body)
    .then(() => {
        res.status(200).json({ massage: "Product updated successfully" });
    })
    .catch((error) => {
        res.status(400).json({ error: error.massage });
    })
}

module.exports = { createProduct, getAllProducts, deleteProduct , updateProduct }