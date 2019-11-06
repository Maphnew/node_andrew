const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes')

// const command = process.argv[2]

// console.log(process.argv)

//Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function(){
        console.log('Adding a new note!' + yargs.argv['title'])
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function(){
        console.log('Removing the note')
    }
})
// Create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function(){
        console.log('Listing the note')
    }
})
// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function(){
        console.log('Reading a note')
    }
})


console.log(yargs.argv)

// const command = yargs.argv
// console.log(command["title"])

// if (command === 'add') {
//     console.log('Adding Note!')
// }else if (command === 'remove') {
//     console.log('Removing Note!')
// } else {
//     console.log('nothing')
// }

// const msg = getNotes()

// console.log(msg)

// console.log(chalk.red.bold.inverse('Error!!'))
// console.log(chalk.bgRgb(15, 100, 204).inverse('Hello!'))
// console.log(chalk.blue.bgRed.bold.inverse('Hello world!'));


// console.log(process.argv[2])