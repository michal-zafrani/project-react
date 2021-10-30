const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: Number,
        require:true
    },
    email: {
        type: String,
        require: true,
        // unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
    ,users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})

module.exports = mongoose.model('admin',adminschema)