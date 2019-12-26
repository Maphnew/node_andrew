const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_APIKEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'zcm3118@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jinssakura@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}! I hope to see you back!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}