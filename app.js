const validator = require('validator')

const getNotes = require('./notes')

const msg = getNotes()

console.log(msg)


console.log(validator.isURL('http://example.com'))