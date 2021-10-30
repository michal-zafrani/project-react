const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const routes = require('./routes/api');
const { checkPromission } = require('./middlewars/checkAuth');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());

dotenv.config();

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('Connected')
    })
    .catch((err) => {
        console.log(`error connecting ${err}`)
    });

app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept , Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Method","PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({});
    }
    next();
});

mongoose.set('useFindAndModify', false);

app.use(checkPromission)

app.use(routes);

app.listen(4040, function () {
    console.log('listen!!');
})

