const Weather = require('../modules/Weather');
const request = require('request');
const User = require('../modules/User');


const requestApi = (city) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.API_KEY}&units=metric`
        };
        request(options, (err, res, body) => {
            if (err)
                reject(err);
            else
                resolve(body);
        });
    })
}

const createWeather = async (req, res) => {
    if (req.body.city) {
        try {
            let objWeather = await requestApi(req.body.city);
            objWeather = JSON.parse(objWeather)
            if (objWeather.cod == '404') {
                res.status(404).json({ massage: objWeather.message })
            }
            let newweather = new Weather({
                nameCity: req.body.city,
                temp: objWeather.main.temp,
                feels_like: objWeather.main.feels_like,
                temp_min: objWeather.main.temp_min,
                temp_max: objWeather.main.temp_max,
                userId: req.uid
            });
            await User.findByIdAndUpdate(req.uid, { $push: { weathers: newweather._id } })
            await newweather.save();
            res.status(200).json(newweather);
        } catch (error) {
            res.status(404).send(error.massage);
        }
    } else {
        res.status(400).json({ massage: 'not send city' });
    }
}


const getWeathers = (req, res) => {
    User.findById(req.uid)
        .populate('weathers')
        .then((resp) => {
            res.status(200).json(resp);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const deleteWeather = (req, res) => {
    User.findByIdAndUpdate(req.uid, { $pull: { weathers: req.body.weatherId } })
        .then(() => {
            Weather.findByIdAndRemove(req.body.weatherId)
                .then((response) => {
                    if (response)
                        res.status(200).json({ message: `delete weather city` });
                    else
                        throw error
                })
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        })
}

module.exports = { createWeather, getWeathers, deleteWeather }