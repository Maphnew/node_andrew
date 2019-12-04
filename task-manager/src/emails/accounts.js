const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'zcm3118@gmail.com',
    from: 'zcm3118@gmail.com',
    subject: 'THis is my first creation',
    text: 'I hope this one actually get to you.'
})