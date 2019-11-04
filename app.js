const chalk = require('chalk')

const getNotes = require('./notes')

const msg = getNotes()

console.log(msg)

console.log(chalk.green.bold.inverse('Success!!'))
console.log(chalk.bgRgb(15, 100, 204).inverse('Hello!'))
console.log(chalk.blue.bgRed.bold.inverse('Hello world!'));