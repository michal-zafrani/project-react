const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    buys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buy'
    }]
})

module.exports = mongoose.model('user',userschema)