# Table of Contents

1. [Section 1: Welcome 1 / 2|8분](#Section-1:-Welcome)  
2. [Section 2: Installing and Exploring Node.js 3 / 5|48분](#Section-2:-Installing-and-Exploring-Node.js)  
3. [Section 3: Node.js Module System (Notes App) 6 / 6|1시간 13분](#Section-3:-Node.js-Module-System-(Notes-App))  
4. [Section 4: File System and Command Line Args (Notes App) 11 / 11|2시간 15분 ](#Section-4:-File-System-and-Command-Line-Args-(Notes-App))  
5. [Section 5: Debugging Node.js (Notes Apps) 3 / 3|22분](#Section-5:-Debugging-Node.js-(Notes-Apps))  
6. [Section 6: Asynchronous Node.js (Weather App) 14 / 14|3시간 16분](#Section-6:-Asynchronous-Node.js-(Weather-App))  
7. [Section 7: Web Servers (Weather App) 11 / 11|2시간 22분](#Section-7:-Web-Servers-(Weather-App))  
8. [Section 8: Accessing API from Browser (Weather App) 7 / 7|1시간 22분](#Section-8:-Accessing-API-from-Browser-(Weather-App))  
9. [Section 9: Application Deployment (Weather App) 10 / 10|1시간 42분](#Section-9:-Application-Deployment-(Weather-App))  
10. [Section 10: MongoDB and Promises (Task App) 11 / 12|2시간 23분](#Section-10:-MongoDB-and-Promises-(Task-App))  
11. [Section 11: REST APIs and Mongoose (Task App) 20 / 20|4시간 8분](#Section-11:-REST-APIs-and-Mongoose-(Task-App))  
12. [Section 12: API Authentication and Security (Task App) 15 / 15|3시간 17분](#Section-12:-API-Authentication-and-Security-(Task-App))  
13. [Section 13: Sorting, Pagination, and Filtering (Task App) 5 / 5|42분](#Section-13:-Sorting,-Pagination,-and-Filtering-(Task-App))  
14. [Section 14: File Uploads (Task App) 8 / 8|1시간 23분](#Section-14:-File-Uploads-(Task-App))  
15. [Section 15: Sending Emails (Task App) 6 / 6|1시간 25분](#Section-15:-Sending-Emails-(Task-App))  
16. [Section 16: Testing Node.js (Task App) 15 / 15|2시간 53분](#Section-16:-Testing-Node.js-(Task-App))  
17. [Section 17: Real-Time Web Applications with Socket.io (Chat App) 0 / 24|4시간 46분](#Section-17:-Real-Time-Web-Applications-with-Socket.io-(Chat-App))  
18. [Section 18: Wrapping Up 0 / 3|7분](#Section-18:-Wrapping-Up)  


## Section 1: Welcome
1 / 2|8분
## Section 2: Installing and Exploring Node.js
3 / 5|48분
## Section 3: Node.js Module System (Notes App)
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

## Section 4: File System and Command Line Args (Notes App)
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

```JavaScript
// note.js
const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.green.inverse(note.title))
        console.log(chalk.green(note.body))
        
    }else{
        console.log(chalk.red.inverse('Error! There is noo note with that title!'))
    }
}
//app.js
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})
```

## Section 5: Debugging Node.js (Notes Apps)
0 / 3|22분


25. Section Intro: Debugging Node.js
2분


26. Debugging Node.js
15분


```JavaScript
// 1.
console.log()
// 2.
debugger

//note.js
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger
    
    if(!duplicateNote){
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
```bash
$ node --inspect-brk app.js add --title="t" --body="b"

```
- Run chrome browser and type "chrome://inspect"

- click  + Add folder to workspace

- click > Resume script execution

- when the cursor on debugger, type "body" or "notes[1]" to Console window



27. Error Messages

- Error Messages on TERMINAL


## Section 6: Asynchronous Node.js (Weather App)
0 / 14|3시간 16분

28. Section Intro: Asynchronous Node.js
1분

- Asynchronous
- non blocking
- single threaded
- event driven

29. Asynchronous Basics
8분

```JavaScript
//app.js for weather-app
console.log('Starting')


setTimeout(()=>{
    console.log('2 Second Timer')
}, 2000)

setTimeout(() => {
    console.log('0 Second Timer')
}, 0)

console.log('Stopping')
```
```bash
Starting
Stopping
0 Second Timer
2 Second Timer
```

30. Call Stack, Callback Queue, and Event Loop
18분

- Call Stack > Node APIs > Callback Queue(Event Loop) > Call Stack

- The Call Stack is a simple data structure provided by the V8 JavaScript engine. The job of the call stack is to track the execution of our program and it does that by keeping track of all of the functions that are currently running.

- Call Stack에서 main()이 처리된 후 Callback Queue에서 CallStack으로 function을 보냄.

31. Making HTTP Requests
15분

```bash
$ npm init -y
$ npm i request@2.88.0
```

```JavaScript
//app.js
const request = require('request')

const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/37.8267,-122.4233'

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.currently)
})
```

32. Customizing HTTP Requests
18분

- json: true
- ?units=si&lang=ko

```JavaScript
//app.js
const request = require('request')

const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/37.8267,-122.4233?units=si&lang=ko'

request({ url: url, json: true}, (error, response) => {
    temperature = response.body.currently.temperature
    precipProbability = response.body.currently.precipProbability
    console.log(response.body.daily.data[0].summary + " It is currently " +temperature+ " degrees out. There is a " +precipProbability+"% chance of rain.")
    // const data = JSON.parse(response.body)
    // console.log(data.currently)
})
```

33. An HTTP Request Challenge
19분

```JavaScript
//app.js

// Geocoding
// Address -> Lat/Long -> Weather

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'

request({ url: geocodeURL, json: true}, (error, response) => {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    console.log(latitude, longitude)
})
```

34. Handling Errors
18분

> 1. connection error.
> 2. wrong input error.

```JavaScript
// app.js
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/129999999.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'

request({ url: geocodeURL, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to location service!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(latitude, longitude)
    }
    
})
```

35. The Callback Function
16분

```JavaScript
// playground/4-callbacks.js
const add = (no1, no2, callback) => {
    setTimeout(() => {
        const num = no1 + no2
        callback(num)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})
```

36. Callback Abstraction
19분

```JavaScript
//app.js

geocode('Boston', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

//utils/geocode.js

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'
    // encodeURIComponent() -> ? becomes %3F

    request({ url: url, json: true }, (error, reponse) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (reponse.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: reponse.body.features[0].center[0],
                longitude: reponse.body.features[0].center[1],
                location: reponse.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

```

37. Callback Abstraction Challenge
14분

```JavaScript
// app.js
forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })

// utils/forecast.js
const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/' +lat +','+ lon + '?units=si&lang=ko'

    request({ url: url, json : true}, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + " It is currently " +response.body.currently.temperature+ " degrees out. There is a " +response.body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast
```

38. Callback Chaining
14분

```JavaScript
//app.js
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if (location) {
    geocode(location, (error, data) => {
        if (error) {
            return console.log(error)
        } 
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
    
            console.log(data.location)
            console.log(forecastData)
    
        })
    })
} else {
    console.log("Please provide an address.")
}


```
```bash
$ node app.js "New York"
$ node app.js Boston
$ node app.js
```

39. ES6 Aside: Object Property Shorthand and Destructuring
15분

```JavaScript
// playground/5-es6-objects.js

//Object property shorthand

const name = 'Andrew'
const userAge = 28

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// const label = product.label
// const stock = product.stock

// const {label:productLabel, stock, rating = 5} = product

// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)
```

40. Destructuring and Property Shorthand Challenge
7분

```JavaScript

//app.js
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if (location) {
    geocode(location, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error)
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
    
            console.log(location)
            console.log(forecastData)
    
        })
    })
} else {
    console.log("Please provide an address.")
}

//geocode.js
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'
    // encodeURIComponent() -> ? becomes %3F

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

//forecast.js
const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/' +lat +','+ lon + '?units=si'

    request({ url, json : true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " +body.currently.temperature+ " degrees out. There is a " +body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast

```

41. Bonus: HTTP Requests Without a Library
```JavaScript
// playground/6-raq-http.js
const https = require('https')
const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/40,-75'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})
request.on('error', (error) => {
    console.log('An error', error)
})
request.end()
```

## Section 7: Web Servers (Weather App)
0 / 11|2시간 22분

42. Section Intro: Web Servers
2분

- Let's get it!

43. Hello Express!
18분

- web-server/src/app.js
```bash
$ npm init -y
$ npm i express@4.16.4
```

```JavaScript
// web-server/src/app.js

const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res)=>{
    res.send('About page')
})

app.get('/weather', (req, res) => {
    res.send('Weather page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

```

44. Serving up HTML and JSON
7분
- Send back Array, JSON, HTML

```JavaScript
// web-server/src/app.js

const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew'
    },{
        name: 'Sera'
    }])
})

app.get('/about', (req, res)=>{
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'good',
        location: 'here'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
```

45. Serving up Static Assets
15분

- app.use(express.static(PUBLIC_PATH))

```JavaScript
// app.js
const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'good',
        location: 'here'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000. http://localhost:3000')
})
```

- public/index.html
- public/help.html
- public/about.html

46. Serving up CSS, JS, Images, and More
12분

- "link", "script", "img" tag
- Client side javascript file (public/js/app.js)
- css file

```JavaScript
// public/index.html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/app.js"></script>
</head>
<body>
    <h1>From a static file</h1>
</body>
</html>
```
```JavaScript
// public/about.html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>About Page!</h1>
    <img src="/img/me.jpg" />
</body>
</html>
```
```css
/* public/css/styles.css */
h1 {
    color: grey;
}

img {
    width: 250px;
}
```


47. Dynamic Pages with Templating
20분
- npm handlebars, npm hbs

```bash
$ npm i hbs@4.0.1
```
- html file > hbs file

```hbs
<!-- views/index.hbs -->
<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/app.js"></script>

</head>
<body>
    
    <h1>{{title}}</h1>
    <p>Create by {{name}}</p>

</body>

</html>
```

```JavaScript
// src/app.js

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

```

48. Customizing the Views Directory
7분

- Directory "views" is as default.
- Visit Expressjs.com documents page

```JavaScript
// src.app.js

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates') // <-- this

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // <-- and this

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
```

49. Advanced Templating
16분

- "Partials" with hbs
```JavaScript
// src/app.js
const hbs = require('hbs')

const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)
```

```hbs
<!-- templates/partials/header.hbs -->
<h1>{{title}}</h1>

<div>
    <a href="/">Weather</a>
    <a href="/about">About</a>
    <a href="/help">Help</a>
</div>

<!-- templates/partials/footer.hbs -->
<p>Created By {{name}}</p>
```

```bash
$ nodemon src/app.js -e js,hbs
```

```hbs
<!-- templates/views/index.hbs -->
<body>
    
    {{>header}}
    {{>footer}}

</body>

<!-- templates/views/about.hbs -->
<body>
    {{>header}}
    <img src="/img/me.jpg" />
    {{>footer}}
</body>

<!-- templates/views/help.hbs -->
<body>
    {{>header}}
    <p>This is {{message}}</p>
    {{>footer}}
</body>
```

50. 404 Pages
14분

- 404 pages with partials hbs

```JavaScript
// src/app.js
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Maphnew Kim',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Maphnew',
        errorMessage: 'Page not found.'
    })
})
```

```hbs
<!-- templates/views/404.hbs -->
<!DOCTYPE html>
<html>
    <header>
        <link rel="stylesheet" href="/css/styles.css">
    </header>
    <body>
        {{>header}}
        <p>{{errorMessage}}</p>
        {{>footer}}
    </body>
</html>
```

51. Styling the Application: Part I
17분

```css
/* public/css/styles.css */
body {
    color: #333333;
    font-family: arial;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 16px;
}

footer {
    color: #888888;
    border-top: 1px solid #eeeeee;
    margin-top: 16px;
    padding: 16px 0;
}

header {
    margin-top: 16px;
    margin-bottom: 48px;
}

h1 {
    font-size: 64px;
    margin-bottom: 16px;
}

header a {
    color: #888888;
    margin-right: 16px;
    text-decoration: none;
}

img {
    width: 250px;
}
```

52. Styling the Application: Part II
14분

- flex, flex-grow
- icon

```css
/* public/css/style.css */
body {
    color: #333333;
    font-family: arial;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    min-height: 100vh
}

.main-content {
    flex-grow: 1;
}

footer {
    color: #888888;
    border-top: 1px solid #eeeeee;
    margin-top: 16px;
    padding: 16px 0;
}

header {
    margin-top: 16px;
    margin-bottom: 48px;
}

h1 {
    font-size: 64px;
    margin-bottom: 16px;
}

header a {
    color: #888888;
    margin-right: 16px;
    text-decoration: none;
}

.portrait {
    width: 250px;
}

```

```hbs
<!-- templates/views/index.hbs -->
<!DOCTYPE html>
<html>
<head>
    <title>Weather</title>
    <link rel="icon" href="/img/weather.png">
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/app.js"></script>
</head>
<body>
    <div class="main-content">
        {{>header}}
        <p>Use this site to get your weather!</p>
    </div>    
    {{>footer}}

</body>
</html>
```


## Section 8: Accessing API from Browser (Weather App)
0 / 7|1시간 22분

53. Section Intro: Accessing API from Browser
1분

54. The Query String
17분

- Browser
- http://localhost:3000/weather?address=boston
> {  
> &nbsp; &nbsp; forecast: "good",  
> &nbsp; &nbsp; location: "here",  
> &nbsp; &nbsp; address: "boston"  
> }  

```JavaScript
// src/app.js

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Error Message'
        })
    }
    res.send({
        forecast: 'good',
        location: 'here',
        address: req.query.address
    })
})
```

55. Building a JSON HTTP Endpoint
11분
- Browser 
- http://localhost:3000/weather?address=boston
> {  
> &nbsp; &nbsp; location: "Boston, Massachusetts, United States",  
> &nbsp; &nbsp; forecast: "Clear throughout the day. It is currently 8.16 degrees out. There is a 0% chance of rain.",  
> &nbsp; &nbsp; address: "boston"  
> }  

```JavaScript
// src/app.js
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Error Message'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                location, //short hand
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

})
```

56. ES6 Aside: Default Function Parameters
12분

- default parameters for a function, destructured parameters

```JavaScript
// playground/7-default-params.js
const greeter = (name = 'user', {some, params = 0} = {}) => {
    console.log('Hello ' + name)
}

greeter('Maphnew')

greeter()
```

```JavaScript
// src/app.js
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Error Message'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                location, //short hand
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

})
```

57. Browser HTTP Requests with Fetch
13분
```JavaScript
// public/js/app.js
console.log('Client side javascript file is loaded!')

fetch('http://localhost:3000/weather?address=?').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return console.log(data.error)
        }
        console.log(data.location)
        console.log(data.forecast)
    })
})
```
58. Creating a Search Form
14분

```JavaScript
//public/js/app.js
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value 

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }
            console.log(data.location)
            console.log(data.forecast)
        })
    })
})
```

```hbs
<!-- templates/views/index.hbs -->
<!DOCTYPE html>

<html>

<head>
    <title>Weather</title>
    <link rel="icon" href="/img/weather.png">
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="main-content">
        {{>header}}
        <p>Use this site to get your weather!</p>

        <form>
            <input placeholder="Location">
            <button>Search</button>
        </form>
    </div>    
    
    {{>footer}}
    
    <script src="/js/app.js"></script>
</body>

</html>
```
- And then input some locations in the input box and click "search" button.

59. Wiring up the User Interface

```JavaScript
// src/app.js
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value 
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})
```

```hbs
<!-- templates/views/index.hbs -->
<!DOCTYPE html>

<html>

<head>
    <title>Weather</title>
    <link rel="icon" href="/img/weather.png">
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="main-content">
        {{>header}}
        <p>Use this site to get your weather!</p>

        <form>
            <input placeholder="Location">
            <button>Search</button>
        </form>
        <p id = "message-1"></p>
        <p id = "message-2"></p>
    </div>    
    
    {{>footer}}

    <script src="/js/app.js"></script>
</body>

</html>
```

```css
/* public/css/styles.css */

input {
    border: 1px solid #cccccc;
    padding: 8px;
}

button {
    cursor: pointer;
    border: 1px solid #888888;
    background: #888888;
    color: white;
    padding: 8px;
}
```

## Section 9: Application Deployment (Weather App)
0 / 10|1시간 42분

60. Section Intro: Application Deployment
1분

61. Joining Heroku and GitHub
10분

62. Version Control with Git
8분

63. Exploring Git
7분

64. Integrating Git
17분

65. Setting up SSH Keys
9분
- SSH Key
- Use git bash
```bash
$ ls -al ~/.ssh
$ ssh-keygen -t rsa -b 4096 -C "zcm3118@gmail.com"
$ ls -al ~/.ssh
id_rsa
id_rsa.pub
$ eval $(ssh-agent -s)
Agent pid 10064
$ ssh-add ~/.ssh/id_rsa
Identity added: /c/Users/Maphnew/.ssh/id_rsa (/c/Users/Maphnew/.ssh/id_rsa)
```

66. Pushing Code to GitHub
12분

```bash
$ cat ~/.ssh/id_rsb.pun
```
- copy all "ssh-res AAA...."
- go to gitbub.com - settings - SSH thing - New
- paste in github

```bash
$ ssh -T git@github.com
type yes
```
```bash
$ git push -u origin master

```


67. Deploying Node.js to Heroku
16분
```bash
$ heroku keys:add
$ heroku create maphnew-weather-application
```

```json
// package.json

  "scripts": {
    "start": "node src/app.js"
  },


```

```bash
$ npm run start
```

```JavaScript
// src/app.js

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port '+port+'. http://localhost:'+port)
})
```
```JavaScript
// public/js/app.js
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
```

```bash
$ git add .
$ git commit -m "Setup app for Heroku"
$ git push
```


```bash
$ git remote
$ git push heroku master
```

68. New Feature Deployment Workflow
14분

```JavaScript
// src/utils/forecast.js

        } else {
            // console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + "It is currently " +body.currently.temperature+ " degrees out. There is a " +body.currently.precipProbability+"% chance of rain. \n \
            Temperature High: " + body.daily.data[0].temperatureHigh + " Temperature Low: " + body.daily.data[0].temperatureLow)
        }
```

```bash
$ git add .
$ git commit -m "..."
$ git push
$ git push heroku master
```

69. Avoiding Global Modules

- Global Modules & Local Modules
- Dependencies & Dev Dependencies

```json
// package.json
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js -e js,hbs"
  },
```
```bash
$ npm uninstall -g nodemon
$ npm install nodemon@1.2.0 --save-dev
```

```json
// package.json
  "devDependencies": {
    "nodemon": "^1.2.0"
  }
```
```bash
$ nodemon src/app.js -e js,hbs
$ npm run dev
```
## Section 10: MongoDB and Promises (Task App)
0 / 12|2시간 23분

70. Section Intro: Databases and Advanced Asynchronous Development
1분

71. MongoDB and NoSQL Databases
8분

- SQL(Structured Query Language) vs NoSQL(Not Only SQL)

|SQL       | NoSQL    |
|:--------:|:--------:|
|DataBase  |DataBase  |
|Row/Record|Document  |
|Table     |Collection|
|Column    |Field     |


72. Installing MongoDB on macOS and Linux
8분

73. Installing MongoDB on Windows
9분

- download mongodb zip
- unzip
- mkdir mongodb-data

```bash
 $ D:\workspaces\workspaceNoSQL\mongodb\bin\mongod.exe --dbpath=d:/workspaces/workspaceNoSql/mongodb-data
```
74. Installing Database GUI Viewer
7분

- google : robo 3t
- download and install robo3t
- run robo3t and set connection localhost:27017
- open shell, run db.version()

75. Connecting and Inserting Documents
19분
- mkdir task-manager
```bash
$ npm init -y
$ npm i mongodb@3.1.10

```

```JavaScript
// task-manager/mongodb.js

// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNweUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Maphnew',
        age: 33
    })
})
```

```bash
$ node mongodb.js
```

- check robo 3t

76. Inserting Documents
17분

```JavaScript
// task-manager/mongodb.js

// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNweUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Maphnew',
    //     age: 33
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },{
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    db.collection('task').insertMany([
        {
            description: 'Study NodeJS',
            completed: false
        },
        {
            description: 'Wash dishes',
            completed: true
        },
        {
            description: 'Laundry',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!')
        }

        console.log(result.ops)
    })

})
```

77. The ObjectID
15분

```JavaScript
// task-manager/mongodb.js

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)
```

78. Querying Documents
17분

```JavaScript
//task-manager/mongodb.js

    //challenge
    db.collection('task').findOne({ _id: new ObjectID("5de371dd671cb7637c8afbe9") }, (error, task) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(task)
    })
    
    db.collection('task').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })
```

79. Promises
18분

```JavaScript
// playground/4-callback.js

const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined)
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }

    console.log(result)
})

```

```JavaScript
// playground/8-promises.js

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([7, 4, 1])
        reject('Things went wrong!')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success!', result)
}).catch((error) => {
    console.log('Error!', error)
})

//
//                                   fulfilled
//                                /
// Promise         -- pending -->
//                                \
//                                   rejected
//


```


80. Updating Documents
16분


```JavaScript
//task-manager/mongodb.js

// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNweUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5de36a6529182f17044def46")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('task').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
   
})


```

81. Deleting Documents
8분

```JavaScript
// task-manager/mongodb.js

// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNweUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //challenge

    db.collection('task').deleteOne({
        description: 'Wash dishes'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
   
})



```

## Section 11: REST APIs and Mongoose (Task App)
0 / 20|4시간 8분

82. Section Intro: REST APIs and Mongoose
1분

83. Setting up Mongoose
17분

- To start service mongodb
```bash
 $ D:\workspaces\workspaceNoSQL\mongodb\bin\mongod.exe --dbpath=d:/workspaces/workspaceNoSql/mongodb-data
```
- install mongoose
```bash
$ npm i mongoose@5.3.16

```
- Write data
```JavaScript
//task-manager/src/db/mongoose.js

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNweUrlParser: true, 
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Maphnew',
    age: 'MMM'
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

```

84. Creating a Mongoose Model
5분

```JavaScript
//task-manager/src/db/mongoose.js

//challenge

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Tasks({
    description: 'Laundry',
    completed: false
})

task.save().then((task) => {
    console.log(laundry)
}).catch((error) => {
    console.log('Error!', error)
})

```

85. Data Validation and Sanitization: Part I
18분


```JavaScript
//task-manager/src/db/mongoose.js

const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNweUrlParser: true, 
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const me = new User({
    name: '    Maphnew   ',
    email: 'MYEMAIL@MAPH.IO    '
})
```

86. Data Validation and Sanitization: Part II
12분

```JavaScript

//task-manager/src/db/mongoose.js

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Tasks({
    description: '      Laundry    '

})

task.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log('Error!', error)
})
```

87. Structuring a REST API
15분

- CRUD
> Create  
>> POST/tasks  

> Read  
>> GET/tasks  
>> GET/tasks/:id  

> Update  
>> PATCH/tasks/:id  

> Delete  
>> delete /tasks/:id


88. Installing Postman
8분

- getpostman.com
- Install
- Make a new request, test with GET https://maphnew-weather-application.herokuapp.com/weather?address=boston

89. Resource Creation Endpoints: Part I
20분

- Delete mongdb.js
- Install express, nodemon
```bash
$ npm i nodemon@1.18.9 --save-dev
```
- Create src/index.js

```JavaScript
// src/index.js

const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ', port)
})
```
- Modify package.json
```JSON
// package.json
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
```
```bash
$ npm run dev
```

```JavaScript
// src/models/user.js
const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }

})

module.exports = User
```



- postman
> Create New Collection  
> Add request  
> Name "Create User"  
> Send POST localhost:3000/users  with Body {  
> 	"name":"Maphnew KIM",  
> 	"email":"maphnew@example.com",  
> 	"password":"Re"  
> }

- https://httpstatuses.com/

> 1×× Informational  
> 100 Continue  
> 101 Switching Protocols  
> 102 Processing  
> 2×× Success  
> 200 OK  
> 201 Created  
> 202 Accepted  
> 203 Non-authoritative Information  
> 204 No Content  
> 205 Reset Content  
> 206 Partial Content  
> 207 Multi-Status  
> 208 Already Reported  
> 226 IM Used  
> 3×× Redirection  
> 300 Multiple Choices  
> 301 Moved Permanently  
> 302 Found  
> 303 See Other  
> 304 Not Modified  
> 305 Use Proxy  
> 307 Temporary Redirect  
> 308 Permanent Redirect  
> 4×× Client Error  
> 400 Bad Request  
> 401 Unauthorized  
> 402 Payment Required  
> 403 Forbidden  
> 404 Not Found  
> 405 Method Not Allowed  
> 406 Not Acceptable  
> 407 Proxy Authentication Required  
> 408 Request Timeout  
> 409 Conflict  
> 410 Gone  
> 411 Length Required  
> 412 Precondition Failed  
> 413 Payload Too Large  
> 414 Request-URI Too Long  
> 415 Unsupported Media Type  
> 416 Requested Range Not Satisfiable  
> 417 Expectation Failed  
> 418 I'm a teapot  
> 421 Misdirected Request  
> 422 Unprocessable Entity  
> 423 Locked  
> 424 Failed Dependency  
> 426 Upgrade Required  
> 428 Precondition Required  
> 429 Too Many Requests  
> 431 Request Header Fields Too Large  
> 444 Connection Closed Without Response  
> 451 Unavailable For Legal Reasons  
> 499 Client Closed Request  
> 5×× Server Error  
> 500 Internal Server Error  
> 501 Not Implemented  
> 502 Bad Gateway  
> 503 Service Unavailable  
> 504 Gateway Timeout  
> 505 HTTP Version Not Supported  
> 506 Variant Also Negotiates  
> 507 Insufficient Storage  
> 508 Loop Detected  
> 510 Not Extended  
> 511 Network Authentication Required  
> 599 Network Connect Timeout Error  

90. Resource Creation Endpoints: Part II
9분

- Challenge
- Create task.js in model, task creation endpoint
- Test from postman

```JavaScript
// src/models/task.js
const mongoose = require('mongoose')

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Tasks
```
```JavaScript
// src/inde.js
const Task = require('./models/task')

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

```

- Test on Postman: POST localhost:3000/tasks


91. Resource Reading Endpoints: Part I
14분

- Read users and user with specific id

```JavaScript
// src/index.js
app.get('/users', (req, res) => {
    User.find({  }).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})
```

- Test with postman

92. Resource Reading Endpoints: Part II
7분
- Challenge
- Read tasks and task with specific id
```JavaScript
// src/index.js
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)

    }).catch((e) => {
        res.status(500).send()
    })
})
```
- Test with postman

93. Promise Chaining
19분

```JavaScript
// playground/8-promises.js
const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}
// multiple then call
add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})
```

94. Promise Chaining Challenge
7분

```JavaScript
// task-manager/playground/promise-chaining-2.js

require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5de64ee587212d5e90e1bdbe').then((task) => {
    console.log('task: ', task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log('result: ', result)
}).catch((e) => {
    console.log(e)
})
```

95. Async/Await
18분
```JavaScript
//playground/9-async-await.js
const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(a, "+" , b)
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }

            resolve(a+b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, 99)
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum2, -3)
    return sum3
}

doWork().then((result) => {
    console.log('result: ', result)
}).catch((e) => {
    console.log('e: ', e)
})
```
96. Async/Await: Part II
12분

```JavaScript
// task-manager/playground/promise-chaining.js

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5deb7e614b65265b204eb86e', 2).then((count) => {
    console.log(count)
```

```JavaScript
// task-manager/playground/promise-chaining-2.js

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5dec4f17ffa5e85b809bc41b').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
```

97. Integrating Async/Await
16분

- callback function > async-await function

```JavaScript
// src/index.js
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    } 

})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }

})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }

})
```

98. Resource Updating Endpoints: Part I
16분

- update

```JavaScript
// src/index.js
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
```

99. Resource Updating Endpoints: Part II
9분

```JavaScript
// src/index.js
app.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})
```

100. Resource Deleting Endpoints
10분


```JavaScript
// src/index.js

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
```

101. Separate Route Files
15분
- Basic Structure
```JavaScript
const router = new express.Router()
router.get('/test', (req,res)=>{
    res.send('This is from my other router.')
})
app.use(router)
```

- make directory router and create user.js, task.js in it.

```JavaScript
// src/router/user.js
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    } 

})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})
module.exports = router
```

```JavaScript
// src/router/task.js
const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }

})

router.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
```
- export router from user.js, task.js
- import router and app.use(router)

```JavaScript
// src/index.js
const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ', port)
})
```
## Section 12: API Authentication and Security (Task App)
0 / 15|3시간 17분

102. Section Intro: API Authentication and Security
1분

103. Securely Storing Passwords: Part I
11분

- hashing algorithm
- myPassw0rd -> q2309usklnm23r58qyadhj23nr

```bash
$ npm i bcryptjs@2.4.3
```
```JavaScript
// src/index.js
// test bcryptjs

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('red12345!', hashedPassword)
    console.log(isMatch)
}



myFunction()
```
104. Securely Storing Passwords: Part II
19분

- mongoose middleware
- .pre

```JavaScript
// src/models/user.js
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }

})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)
```
```JavaScript
// src/router/user.js
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
```

105. Logging in Users
14분

```JavaScript
// src/router/users.js
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        res.send(user)
    } catch(e) {
        res.status(400).send()
    }
})
```

```JavaScript
// src/models/users.js
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
```


106. JSON Web Tokens
12분

- JSON Web Token
> Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1NzYzMTMxNzV9.Wrc1hAqpHgUMNeuqDwlgqob8r231wqMwgarkruP34QI  


> first period - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 : base 64 encoded json string. Known as "header", Contains meta information about what type of token it is, algorithm that was used.

> second one - eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1NzYzMTMxNzV9 : base 64 encoded json string. Known as "payload", "body", Contains data that we provided.  

> last one - Wrc1hAqpHgUMNeuqDwlgqob8r231wqMwgarkruP34QI : "signature", Used to validate that the token is trustworthy and has not been tapered with.  

- https://www.base64decode.org/


```JavaScript
// src/app.js

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}
```

107. Generating Authentication Tokens
14분


```JavaScript
// src/models/user.js
+++++++
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
```

```JavaScript
// src/router/user.js
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})



router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e) {
        res.status(400).send()
    }
})
```

108. Express Middleware
13분

```JavaScript
// src/index.js
app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET requests are disabled')
    } else {
        next()
    }
})

// Without middleware: new request -> run route handler
//
// With middleware: new request -> do simething -> run route handler
```

109. Accepting Authentication Tokens
20분


```JavaScript
// src/middleware/auth.js

const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
```

110. Advanced Postman
17분

- Postman environment  
- Postman environment variable  
- Authorization: Inherit Auth from Parent  


111. Logging Out
11분


```JavaScript
// router/user.js

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


```
- Test with postman, add request "logout user", "logout all"


112. Hiding Private Data
11분


```JavaScript
// src/models/user.js
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
```

113. Authenticating User Endpoints
12분


```JavaScript
// src/router/user.js
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})
```


114. The User/Task Relationship
19분


```JavaScript
// src/models/user.js
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
```
```JavaScript
// src/router/task.js
router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})
```
```JavaScript

// src/index.js
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e00d76af451525e08aa22c5')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5e00d74cf451525e08aa22c3')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
```


115. Authenticating Task Endpoints
16분

- auth, populate, findOne, owner, etc.

```JavaScript
// src/router/task.js

router.get('/tasks', auth, async (req, res) => {

    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send()
    }

})

router.patch('/tasks/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update] )
        await task.save()        
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
```
116. Cascade Delete Tasks
5분

```JavaScript
// src/models/user.js
// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})
```

## Section 13: Sorting, Pagination, and Filtering (Task App)
0 / 5|42분
117. Section Intro: Sorting, Pagination, and Filtering
1분

118. Working with Timestamps
7분

```JavaScript
// src/models/user.js
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})
```

```JavaScript
// src/models/task.js
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Tasks = mongoose.model('Task', taskSchema)

module.exports = Tasks
```

119. Filtering Data
12분

```JavaScript
// src/router/task.js
// GET /tasks?completed=true
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})
```

120. Paginating Data
11분

```JavaScript
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})
```
121. Sorting Data
11분

```JavaScript
// src/router/task.js

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})
```

## Section 14: File Uploads (Task App)
0 / 8|1시간 23분
122. Section Intro: File Uploads
1분

123. Adding Support for File Uploads
19분

```JavaScript
// src/index.js
const multer = require('multer')
const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

```

```JavaScript
// src/router/user.js

const upload = multer({
    dest: 'avatars'
})

router.post('/users/me/avatar', upload.single('avatar'), (req,res) => {
    res.status(200).send()
})
```

124. Validating File Uploads
15분

```JavaScript
// src/index.js
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a PDF'))
        }

        cb(undefined, true)
    }
})
```

125. Validation Challenge
5분

```JavaScript
const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload jpg or jpeg or png'))
        }
        cb(undefined, true)
    }
})
```

126. Handling Express Errors
8분

```JavaScript
// src/index.js

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
```

```JavaScript
// src/router/user.js

router.post('/users/me/avatar', upload.single('avatar'), (req,res) => {
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
```

127. Adding Images to User Profile
15분

- add avatar (type: Buffer)

```JavaScript
// src/models/user.js

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
})

```
- use req.file.buffer

```JavaScript
// src/router/user.js
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
```
- check robo3T(DB)
- go to www.jsbin.com 
- test binary text to jsbin
```JavaScript
<img src="data:image/jpg;base64, binary text from DB" >
```

- create delete router
```JavaScript
// src/router/user.js

router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()
})
```

128. Serving up Files
8분

```JavaScript
// src/router/user.js

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e){
        res.status(404).send()
    }
})
```

129. Auto-Cropping and Image Formatting
12분

- private data
```JavaScript
// src/models/user.js
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}
```
- npm install sharp

```bash
$ npm i sharp@0.23.4
```
- resize
- to png 

```JavaScript
// src/router/user.js
const sharp = require('sharp')

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e){
        res.status(404).send()
    }
})
```
## Section 15: Sending Emails (Task App)
0 / 6|1시간 25분
130. Section Intro: Sending Emails
1분

131. Exploring SendGrid
13분
- sendgrid sign up
- get AIPKey
- npm install sendgrid mail

```bash
$ npm i @sendgrid/mail@6.4.0
```

```JavaScript
// src/emails/account.js

const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '~~~~'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to:'zcm3118@gmail.com',
    from: 'zcm3118@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you'
})
```

```bash
$ node src/emails/account.js
```

- check your email

132. Sending Welcome and Cancelation Emails
16분

133. Environment Variables
19분

```bash
$ npm i env-cmd@8.0.2 --save-dev
```

- mkdir /task-manager/config/
- mkfile dev.env

- PORT
- SENDGRID_APIKEY
- JWT_SECRET
- MONGODB_URL


134. Creating a Production MongoDB Database
15분

135. Heroku Deployment
20분

## Section 16: Testing Node.js (Task App)
0 / 15|2시간 53분
136. Section Intro: Testing Node.js
2분

- npm jest for testing 
- npm supertest for testing express

137. Jest Testing Framework
16분


> Why test?  
>> - Saves time  
>> - Creates reliable software  
>> - Gives flexibility to developers  
>>   - Refactoring  
>>   - Collaborating  
>>   - Profiling  
>> - Peace of mind  

```bash
$ npm i jest@24.9.0 --save-dev
```
```json
// package.json

  "scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js",
    "test":"jest"
  },
```
```JavaScript
// /tests/math.test.js

test('Hello world!', () => {

})

test('This should fail', () => {
    throw new Error('Failure!')
})

```
```bash
$ npm test
```

138. Writing Tests and Assertions
18분

```JavaScript
// src/math.js
const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)
module.exports = {
    calculateTip
}
```

```JavaScript
// tests/math.test.js

const { calculateTip } = require('../src/math')

test('Should calculate total and tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

//
// Why test?

// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind
```
```bash
$ npm test
```
139. Writing Your Own Tests
6분

```JavaScript
// src/math.js
const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}
```

```JavaScript
// tests/math.test.js
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Should calculate total and tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test("Should convert 32 F to 0 C", () => {
    const cel = fahrenheitToCelsius(50)
    expect(cel).toBe(10)
})
test("Should convert 0 C to 32 F", () => {
    const fah = celsiusToFahrenheit(10)
    expect(fah).toBe(50)
})
//
// Why test?

// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind
```

```bash
$ npm test
```

140. Testing Asynchronous Code
14분

```json
// package.json
  "scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js",
    "test":"jest --watch"
  },
```
```bash
$ npm test
```

```JavaScript
// tests/math.test.js
test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(11, 22)
    expect(sum).toBe(32)
})
```

141. Testing an Express Application: Part I
6분

```json
// package.json

  "scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js",
    "test":"env-cmd ./config/test/env jest --watch"
  },
  "jest": {
    "testEnvironment": "node"
  },
```
```
config/test.env

PORT=3000
SENDGRID_APIKEY=
JWT_SECRET=thisismynewcourse
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test
```
142. Testing an Express Application: Part II
14분


```JavaScript
// src/tests/user.test.js
const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Maphnew',
        email: 'maphnew2@example.com',
        password: 'MyPass888!'
    }).expect(201)
})
```
```JavaScript
// src/app.js
const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app
```
```JavaScript
// src/index.js
const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ', port)
})
```

143. Jest Setup and Teardown
14분

```JavaScript
// src/tests/user.test.js
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Maphnew',
        email: 'maphnew12@example.com',
        password: 'MyPass888!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async ()=>{
    await await request(app).post('/users/login').send({
        email: 'abc@email.com',
        password: 'foa0187rqwead'
    }).expect(400)
})

```

144. Testing with Authentication
13분
```JavaScript
// src/tests/user.test.js
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
```

145. Advanced Assertions
13분


```JavaScript
// tests/user.test.js

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Maphnew',
        email: 'maphnew12@example.com',
        password: 'MyPass888!'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Maphnew',
            email: 'maphnew12@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass888!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Fetch ther user from the database
    // Assert that token in response matches users second token
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})


test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
```

146. Mocking Libraries
6분
- jestjs-mocks
- https://jestjs.io/docs/en/manual-mocks

```JavaScript
// tests/__mocks__/@sendgrid/mail.js

module.exports = {
    setApiKey() {

    },
    send() {
        
    }
}
```

147. Wrapping up User Tests
16분

```JavaScript
// tests/user.test.js

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'sara'
        })
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('sara')
})

test('Should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Boston'
        })
        .expect(404)
})
```

148. Setup Task Test Suite
15분

```json
// package.json
  "scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js",
    "test": "env-cmd ./config/test.env jest --watch --runInBand"
  },
```

```JavaScript
// tests/user.test.js
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)
```
```JavaScript
// tests/task.test.js
const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

```
```JavaScript
// tests/fixtures/db.js
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}

```

149. Testing with Task Data
16분

- Challenge

```JavaScript
const { 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo, 
    taskOne, 
    taskTwo, 
    taskThree, 
    setupDatabase
} = require('./fixtures/db')


test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})
```

150. Bonus: Extra Test Ideas
3분
- links.mead.io/extratests

```JavaScript

// testIdeas.js
//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks


```
## Section 17: Real-Time Web Applications with Socket.io (Chat App)
0 / 24|4시간 46분
151. Section Intro: Real-Time Web Applications with Socket.io
1분

152. Creating the Chat App Project
13분

- Setup express
- Scripts at package.json

153. WebSockets
6분

154. Getting Started with Socket.io
12분

```bash
$ npm i socket.io@2.2.0
```
```JavaScript
// src/index.js

const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', () => {
    console.log('New WebSocket connection')
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
```
155. Socket.io Events
17분

- server (emit) -> client (receive) - countUpdated  
- client (emit) -> server (receive) - increment  

```JavaScript
// src/index.js

const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        io.emit('countUpdated', count)
    })
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
```

```JavaScript
// public/js/chat.js

const socket = io()

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})
```
```html
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat App</title>
</head>
<body>
    <h1>Chat App</h1>
    <button id="increment">+1</button>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/js/chat.js"></script>
</body>
</html>
```
156. Socket.io Events Challenge
16분
```html
<!-- public/index.html -->

    <form id="message-form">
        <h1>Weather</h1>
        <input name="message" placeholder="Message">
        <button value="submit">Submit</button>
    </form>
```

```JavaScript
// public/js/chat.js
socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message)
})
```
```JavaScript
// src/index.js

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

})
```

157. Broadcasting Events
6분
- To emit particular connection: socket.emit()
- To emit to everybody but that particular connection: socket.broadcast.emit()
- To emit to send it everyone: io.emit()
```JavaScript
//To emit particular connection
socket.emit('message', 'Welcome!')
//To emit to everybody but that particular connection
socket.broadcast.emit('message', 'A new user has joined!')
//To emit to send it everyone
io.emit('message', message)
```

```JavaScript
// src/index.js

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

})

```

158. Sharing Your Location
15분

```html
<!-- public/index.html -->

    <button id="send-location">Send location</button>
```

```JavaScript
// public/js/chat.js

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})
```
```JavaScript
// src/index.js

    socket.on('sendLocation', (coords) => {
        
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
```


159. Event Acknowledgements
13분

- server (emit) -> client (receive) --acknowledgement--> server  
- client (emit) -> server (receive) --acknowledgemnet--> client
- install bad-words

```JavaScript
// src/index.js
io.on('connection', (socket) => {

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        
        io.emit('message', message)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

    socket.on('sendLocation', (coords, callback) => {
        
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

})
```

```JavaScript
// public/js/chat.js

    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
        })
```

160. Form and Button States
11분

```JavaScript
// public/js/chat.js

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
        
    })
})

```

161. Rendering Messages
13분

```JavaScript
// public/js/chat.js

const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
```

```html
<!-- public/index.html -->

    <div id="messages"></div>

    <form id="message-form">
        <!-- <h1>Weather</h1> -->
        <input name="message" placeholder="Message">
        <button>Send</button>
    </form>
    <button id="send-location">Send location</button>

    <script id="message-template" type="text/html">
        <div>
            <p>{{message}}</p>
        </div>
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
 

```

162. Rendering Location Messages
10분

```JavaScript
// public/js/chat.js

const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(locationMessageTemplate, {
        url
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
```

```JavaScript
// src/index.js

    socket.on('sendLocation', (coords, callback) => {
        
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

```

```html
<!-- public/index.html -->
    <script id="location-message-template" type="text/html">
        <div>
            <p><a href={{url}} target="_blank">My current location</a></p>
        </div>
    </script>
```
163. Working with Time
20분

```html
<!-- public/index.html -->
    <script id="message-template" type="text/html">
        <div>
            <p>{{createdAt}} - {{message}}</p>
        </div>
    </script>
```

```JavaScript
// src/index.js
const { generateMessage } = require('./utils/messages')

io.on('connection', (socket) => {

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        
        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })

    socket.on('sendLocation', (coords, callback) => {
        
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

})
```

```JavaScript
// public/js/chat.js

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
```

```JavaScript
// src/utils/messages.js

const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}
```
164. Timestamps for Location Messages
7분

```html
<!-- public/index.html -->
    <script id="location-message-template" type="text/html">
        <div>
            <p>{{createdAt}} - <a href={{url}} target="_blank">My current location</a></p>
        </div>
    </script>
```

```JavaScript
// src/index.js
const { generateMessage, generateLocationMessage } = require('./utils/messages')

    socket.on('sendLocation', (coords, callback) => {
        
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })
```

```JavaScript
// public/js/chat.js

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(locationMessageTemplate, {
        url: url.url,
        createdAt: moment(url.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
```

```JavaScript
// src/utils/messages.js

const generateLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}
```

165. Styling the Chat App
13분

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat App</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/css/styles.min.css">
</head>
<body>
    <div class="chat">
        <div class="chat__sidebar">

        </div>
        <div class="chat__main">
            <div id="messages" class="chat__messages"></div>

            <div class="compose">
                <form id="message-form">
                    <input name="message" placeholder="Message">
                    <button>Send</button>
                </form>
                <button id="send-location">Send location</button>
            </div>

        </div>
    </div>

    <script id="message-template" type="text/html">
        <div class="message">
            <p>
                <span class="message__name">Some User Name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p>{{message}}</p>
        </div>
    </script>

    <script id="location-message-template" type="text/html">
        <div calss="message">
            <p>
                <span class="message__name">Some User Name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p><a href={{url}} target="_blank">My current location</a></p>
        </div>
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/js/chat.js"></script>
</body>
</html>
```

166. Join Page
6분
```JavaScript
// public/index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat App</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/css/styles.min.css">
</head>
<body>
    <div class="centered-form">
        <div class="centered-form__box">
            <h1>Join</h1>
            <form action="/chat.html">
                <labe>Display nmame</labe>
                <input type="text" name="username" placeholder="Display name" required> 
                <label>Room</label>
                <input type="text" name="room" placeholder="Room" required>
                <button>Join</button>
            </form>
        </div>
    </div>
</body>
</html>
```

```JavaScript
// public/chat.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat App</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/css/styles.min.css">
</head>
<body>
    <div class="chat">
        <div class="chat__sidebar">

        </div>
        <div class="chat__main">
            <div id="messages" class="chat__messages"></div>

            <div class="compose">
                <form id="message-form">
                    <input name="message" placeholder="Message">
                    <button>Send</button>
                </form>
                <button id="send-location">Send location</button>
            </div>

        </div>
    </div>

    <script id="message-template" type="text/html">
        <div class="message">
            <p>
                <span class="message__name">Some User Name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p>{{message}}</p>
        </div>
    </script>

    <script id="location-message-template" type="text/html">
        <div calss="message">
            <p>
                <span class="message__name">Some User Name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p><a href={{url}} target="_blank">My current location</a></p>
        </div>
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/js/chat.js"></script>
</body>
</html>
```

167. Socket.io Rooms
15분

```JavaScript
// src/index.js

    socket.on('join', ({ username, room }) => {
        socket.join(room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))

        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })
```

```JavaScript
// public/js/chat.js

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit('join', { username, room })
```

168. Storing Users: Part I
17분

```JavaScript
// src/utils/users.js

const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if ( !username || !room ) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if(existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

addUser({
    id: 22,
    username: 'Maphnew',
    room: 'South Korea'
})

console.log(users)

const removedUser = removeUser(22)

console.log(removedUser)
console.log(users)
```

169. Storing Users: Part II
8분

```JavaScript
// src/utils/users.js

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room) 
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
```

170. Tracking Users Joining and Leaving
14분

```JavaScript
// public/js/chat.js

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

```

```JavaScript
// src/index.js
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))

        callback()

    })

        socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left!`))
        }
    })

```

171. Sending Messages to Rooms
14분

172. Rendering User List
12분

173. Automatic Scrolling
16분

174. Deploying the Chat Application
8분

## Section 18: Wrapping Up
0 / 3|7분
175. Section Intro
1분

176. New Feature Ideas
4분

177. Bonus: What should I learn next?
3분