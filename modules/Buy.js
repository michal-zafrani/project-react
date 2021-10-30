const mongoose = require('mongoose');

const buyschema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: String,
        required: true
    },
    sumproducts: {
        type: Number,
        required: true
    },
    pricetotal: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('buy',buyschema);