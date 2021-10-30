const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    group: {
        type: String,
    },
    img: {
        type: String,
    }
})

module.exports = mongoose.model('product',productschema)