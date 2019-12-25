const nodemailer = require('nodemailer')
require("dotenv").config()


const NODE_ENV = process.env.NODE_ENV || 1234

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'zcm3118@gmail.com',
        pass: NODE_ENV
    }
})

let mailOptions = {
    from: 'zcm3118@gmail.com',
    to: 'jinssakura@gmail.com',
    subject: 'NODEMALER TEST!',
    text: 'Hope this get to you'
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error!!!! ', error.message)
    }
    console.log('Email sent: ', info.response)
})