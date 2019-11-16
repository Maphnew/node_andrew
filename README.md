## 섹션 1: Welcome
1 / 2|8분
## 섹션 2: Installing and Exploring Node.js
3 / 5|48분
## 섹션 3: Node.js Module System (Notes App)
3 / 6|1시간 13분

8. Section Intro: Node.js Module System
1분

9. Importing Node.js Core Modules
16분

- fs. thing

10. Importing Your Own Files
17분

```JavaScript
//app.js
const getNotes = require('./notes')
//notes.js
module.exports = getNotes
```

11. Importing npm Modules
17분

```bash
$ node -v
$ npm -v
$ npm init
$ npm i validator@10.8.0

```
- double quotes in the package.json

12. Printing in Color
14분
- search chalk on npm

```bash
$ npm i chalk@2.4.1
```

```JavaScript
const chalk = require('chalk')
consol.log(chalk.red.bold.inverse('Error!'))
```

- search "modbus", "redis" ...

13. Global npm Modules and nodemon
7분
- Global option(Local/Global modules)
- Don't have to import modules and Can use on terminal
- npm install nodemon@1.18.5 -g

```bash
$ nodemon app.js
```

## 섹션 4: File System and Command Line Args (Notes App)
0 / 11|2시간 15분

14. Section Intro: File System and Command Line Args
1분

15. Getting Input from Users
10분

```bash
$ node app.js add --title='This is my title.'
```
```JavaScript
//app.js
console.log(process.argv)
```
output
```powershell
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\workspaces\\workspaceNodeJS\\node_andrew\\app.js',
  'add',
  '--title=This is my title'
]
```

16. Argument Parsing with Yargs: Part I
15분

```bash
$ npm i yargs@14.2.0
$ node app.js add --title="Things to buy"
{_: [ 'add' ], title: 'Things to buy', '$0': 'app.js'}
```

```JavaScript
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function(){
        console.log('Adding a new note!')
    }
})
```

```bash
$ node app.js add
Adding a new note!
{ _: [ 'add' ], '$0': 'app.js' }
```

17. Argument Parsing with Yargs: Part II
11분

- builder / title, body
- demandOption, type
- yargs.parse()
- function(argv)

```JavaScript
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        // console.log('Adding a new note!' + yargs.argv['title'])
        console.log('Title: ' + argv.title)
        console.log('Body: ' + argv.body)
    }
})

yargs.parse()
```

18. Storing Data with JSON
18분

- read JSON file
- Buffer(byte) to String
- String to JSON
- Change things
- JSON to String
- write json file with that String file

```JavaScript
//1-json.js
const fs = require('fs')
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.name)

data.name = 'KIM'
data.age = 50

console.log(data)
const dataString = JSON.stringify(data)
fs.writeFileSync('1-json.json', dataString)
```

```JavaScript
//1-json.json
{"name":"KIM","planet":"Earth","age":50}
```


19. Adding a Note
19분

- define functions. addNote, loadNotes, saveNotes
- load - duplication check - saveNotes

```JavaScript
//note.js
const fs = require('fs')
const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log('New note added!')
    }else{
        console.log('Note title taken!')
    }

    
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
    
}
```

20. Removing a Note
15분

```JavaScript
//app.js
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
        //console.log('Removing the note')
    }
})
//note.js
const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title !== title
    })
    console.log(notes)
    console.log(notesToKeep)
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse("No note found!"))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note removed!"))
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}
```

```bash
$ node app.js remove --title="t"
```

21. ES6 Aside: Arrow Functions
14분

```JavaScript
// old
// const square = function (x) {
//     return x * x
// }

// arrow function
// const square = (x) => {
//     return x*x
// }

// const square = (x) => x*x

// console.log(square(2))

const event = {
    name: 'Birthday Party',
    guestList : ['Andrew','Jen','Mike'],
    printGuestList() {
        //const that = this

        console.log('Guest list for ' + this.name)

        // this.guestList.forEach(function(guest) {
        //     console.log(guest + ' is attending ' + that.name)
        // })
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()
```

22. Refactoring to Use Arrow Functions
15분
```JavaScript
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
  
}
```

23. Listing Notes
6분

```JavaScript
//note.js
const listNotes = () => {
    console.log(chalk.blue.inverse("Your notes"))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    });
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes : listNotes
}
//app.js
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {notes.listNotes()}
})
```

24. Reading a Note
12분


## 섹션 5: Debugging Node.js (Notes Apps)
0 / 3|22분
## 섹션 6: Asynchronous Node.js (Weather App)
0 / 14|3시간 16분
## 섹션 7: Web Servers (Weather App)
0 / 11|2시간 22분
## 섹션 8: Accessing API from Browser (Weather App)
0 / 7|1시간 22분
## 섹션 9: Application Deployment (Weather App)
0 / 10|1시간 42분
## 섹션 10: MongoDB and Promises (Task App)
0 / 12|2시간 23분
## 섹션 11: REST APIs and Mongoose (Task App)
0 / 20|4시간 8분
## 섹션 12: API Authentication and Security (Task App)
0 / 15|3시간 17분
## 섹션 13: Sorting, Pagination, and Filtering (Task App)
0 / 5|42분
## 섹션 14: File Uploads (Task App)
0 / 8|1시간 23분
## 섹션 15: Sending Emails (Task App)
0 / 6|1시간 25분
## 섹션 16: Testing Node.js (Task App)
0 / 15|2시간 53분
## 섹션 17: Real-Time Web Applications with Socket.io (Chat App)
0 / 24|4시간 46분
## 섹션 18: Wrapping Up
0 / 3|7분