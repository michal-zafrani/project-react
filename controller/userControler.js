const User = require('../modules/User');
const Buy = require('../modules/Buy');
const funSendMail = require('./mailController');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



//create user - get params from body 
const logUp = async (req, res) => {
    console.log('enter function createuser');
    let newuser = new User({
        name: req.body.username,
        password: req.body.password,
    });

    newuser.save()
    .then(response => {
        res.status(200).json({
                    action: 'create',
                    user: response,
                    token: jwt.sign({ id: response._id }, process.env.SECRET_JWT)
                });
    })
    .catch(error => {
        res.status(400).json({ error: error.message })
    })
}

const logIn = (req, res) => {
    console.log('enter login');
    User.findOne({ name: req.query.name, password: req.query.password })
        .then((user) => {
            res.status(200).json({ user, token: jwt.sign({ id: user._id }, process.env.SECRET_JWT) })
        })
        .catch((error) => {
            res.status(400).json({ error: error.message })
        })
}


const signIn = (req, res) => {
    console.log('enter signin');
    User.findOne({ name: req.body.username, password: req.body.password })
        .then((user) => {
            res.status(200).json({action: 'login' , user, token: jwt.sign({ id: user._id }, process.env.SECRET_JWT) })
        })
        .catch((error) => {
            logUp(req, res);
        })
}

const logInWithJwt = (req , res) => {
    let jwto = req.headers['authorization'];
    let { id } = (jwt.verify(jwto, process.env.SECRET_JWT));

    User.findById(id)
    .then((user) => {
        console.log(user);
        res.status(200).json({action: 'login' , user: user, token: jwt.sign({ id: user._id }, process.env.SECRET_JWT) })
    })
    .catch(err => {
        res.status(408).json({err, from: 'logInWithJwt ERROR'})
    })
}

const updateUser = (req, res) => {
    User.updateOne({ _id: req.uid }, req.body)
        .then(() => {
            res.status(200).json({ massage: "user updated successfully" });
        })
        .catch((error) => {
            res.status(400).json({ error: error.massage });
        })
}

const deleteUser = (req, res) => {
    // Admin.findOneAndUpdate({ name: 'admin' }, { $pull: { users: req.uid } })
    // .then(() => {
    Buy.deleteMany({ userId: req.uid })
        .then(() => {
            User.findByIdAndDelete(req.uid)
                .then(() => {
                    res.status(200).json({ message: 'user sign out' })
                })
        })
    // })
    // .catch((error) => {
    //     res.status(400).json({ error: error.message })
    // })
}


module.exports = { logUp, logIn , signIn , logInWithJwt , updateUser, deleteUser };