const Buy = require('../modules/Buy');
const User = require('../modules/User');

const createBuy = (req, res) => {

    console.log('enter function create Buy');
    let newBuy = new Buy({
        username: req.body.username,
        userId: req.body.userId,
        date: new Date(),
        sumproducts: req.body.sumproducts,
        pricetotal: req.body.pricetotal,
    });
    newBuy.save()
        .then((resl) => {
            User.findByIdAndUpdate(req.body.userId, { $push: { buys: newBuy._id } })
                .then((resp) => {
                    res.status(200).json(resl);
                })
        })
        .catch((err) => {
            res.status(404).send(err.massage);
        })
}

const getBuysList = (req, res) => {
    User.findById(req.uid)
    .populate('buys')
    .then(response => { 
        console.log(response);
        res.status(200).json(response)})
    .catch((err) => {res.status(404).send(err.massage)})
}

module.exports = { createBuy , getBuysList };