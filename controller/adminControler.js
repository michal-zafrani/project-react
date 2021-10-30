const Admin = require('../modules/Admin');
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createAdmin = async (req, res) => {
    Admin.find().then((admin_array) => {
        if (admin_array.length === 0) {
            let newAdmin = new Admin({
                name: 'admin',
                password: req.body.password,
            });
            newAdmin.save().then(() => {
                res.status(200).json({
                    massage: 'create admin',
                    token: jwt.sign({ id: newAdmin._id }, process.env.SECRET_JWT)
                })
            })
                .catch(error => {
                    res.status(400).json({ error: error.massage })
                })
        } else {
            res.status(400).json({ error: "may create just one admin" });
        }
    }).catch(error => {
        res.status(400).json({ error: error.massage });
    })
}

const getAdmin = (req, res) => {
    Admin.findById(req.params.adminId)
        .then((admin) => {
            res.status(200).json({
                admin: admin,
                token: jwt.sign({ id: req.params.adminId }, process.env.SECRET_JWT)
            })
        })
        .catch((error) => {
            res.status(400).json({ error: error.massage });
        })
}

const getallusers = (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json({ users });
        })
        .catch((error) => {
            res.status(400).json({ error: error.massage })
        })
}

const deleteUser = (req, res) => {
    Admin.findOneAndUpdate({ name: 'admin' }, { $pull: { users: req.params.uid } })
        .then(() => {
            User.remove({ _id: req.params.uid })
                .then(() => {
                    res.status(200).json({ massage: `delete user by id: ${req.params.uid}` });
                })
        })
        .catch((error) => {
            res.status(400).json({ error: error.message })
        })

}

const updateAdmin = (req, res) => {
    Admin.findOneAndUpdate({ _id: req.params.adminId }, req.body)
        .then(() => {
            res.status(200).json({ massage: "admin updated successfully" });
        })
        .catch((error) => {
            res.status(400).json({ error: error.massage });
        })
}


module.exports = { createAdmin, getAdmin, getallusers, deleteUser, updateAdmin };