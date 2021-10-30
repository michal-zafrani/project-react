const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../modules/User');
const cookie = require('cookie');

dotenv.config();

const checkPromission = (req, res, next) => {
    let jwto = req.headers['authorization'];
    if (req.originalUrl.includes('logUp') || req.originalUrl.includes('logIn') || req.originalUrl.includes('getAllProducts')|| req.originalUrl.includes('signIn'))
        return next();
    if (jwto) {
        let { id } = (jwt.verify(jwto, process.env.SECRET_JWT));
        User.findById(id).then((user) => {
            if (user) {
                req.uid = user._id;
                if (user.name == 'admin' && user.password == process.env.ADMIN_PASSWORD) {
                    req.admin = true;
                }
                return next();
            } else
                res.status(400).json({ error: "token is not valid" })
        }).catch((error) => {
            res.status(400).json({ error: error.message, mymassage: "in chakauth" })
        })
    } else {
        res.status(400).send('no jwt');
    }
}

module.exports = {
    checkPromission
}