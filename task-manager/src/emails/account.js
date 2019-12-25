const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to:'zcm3118@gmail.com',
    from: 'zcm3118@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you'
})