const nodemailer = require('nodemailer');

const funSendMail = (mailOptions) => {
    return new Promise((resolve,reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'michal0533121602@gmail.com',
                pass: process.env.PASSWORD_MAIL
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info)
            }
        });
    })
}

module.exports = funSendMail;