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

## 섹션 5: Debugging Node.js (Notes Apps)
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


## 섹션 6: Asynchronous Node.js (Weather App)
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

## 섹션 7: Web Servers (Weather App)
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

52. Styling the Application: Part II
14분


## 섹션 8: Accessing API from Browser (Weather App)
0 / 7|1시간 22분

53. Section Intro: Accessing API from Browser
1분

54. The Query String
17분

55. Building a JSON HTTP Endpoint
11분

56. ES6 Aside: Default Function Parameters
12분

57. Browser HTTP Requests with Fetch
13분

58. Creating a Search Form
14분

59. Wiring up the User Interface

## 섹션 9: Application Deployment (Weather App)
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

66. Pushing Code to GitHub
12분

67. Deploying Node.js to Heroku
16분

68. New Feature Deployment Workflow
14분

69. Avoiding Global Modules

## 섹션 10: MongoDB and Promises (Task App)
0 / 12|2시간 23분

70. Section Intro: Databases and Advanced Asynchronous Development
1분

71. MongoDB and NoSQL Databases
8분

72. Installing MongoDB on macOS and Linux
8분

73. Installing MongoDB on Windows
9분

74. Installing Database GUI Viewer
7분

75. Connecting and Inserting Documents
19분

76. Inserting Documents
17분

77. The ObjectID
15분

78. Querying Documents
17분

79. Promises
18분

80. Updating Documents
16분

81. Deleting Documents
8분

## 섹션 11: REST APIs and Mongoose (Task App)
0 / 20|4시간 8분

82. Section Intro: REST APIs and Mongoose
1분

83. Setting up Mongoose
17분

84. Creating a Mongoose Model
5분

85. Data Validation and Sanitization: Part I
18분

86. Data Validation and Sanitization: Part II
12분

87. Structuring a REST API
15분

88. Installing Postman
8분

89. Resource Creation Endpoints: Part I
20분

90. Resource Creation Endpoints: Part II
9분

91. Resource Reading Endpoints: Part I
14분

92. Resource Reading Endpoints: Part II
7분

93. Promise Chaining
19분

94. Promise Chaining Challenge
7분

95. Async/Await
18분

96. Async/Await: Part II
12분

97. Integrating Async/Await
16분

98. Resource Updating Endpoints: Part I
16분

99. Resource Updating Endpoints: Part II
9분

100. Resource Deleting Endpoints
10분

101. Separate Route Files
15분

## 섹션 12: API Authentication and Security (Task App)
0 / 15|3시간 17분

102. Section Intro: API Authentication and Security
1분

103. Securely Storing Passwords: Part I
11분

104. Securely Storing Passwords: Part II
19분

105. Logging in Users
14분

106. JSON Web Tokens
12분

107. Generating Authentication Tokens
14분

108. Express Middleware
13분

109. Accepting Authentication Tokens
20분

110. Advanced Postman
17분

111. Logging Out
11분

112. Hiding Private Data
11분

113. Authenticating User Endpoints
12분

114. The User/Task Relationship
19분

115. Authenticating Task Endpoints
16분

116. Cascade Delete Tasks
5분

## 섹션 13: Sorting, Pagination, and Filtering (Task App)
0 / 5|42분
117. Section Intro: Sorting, Pagination, and Filtering
1분

118. Working with Timestamps
7분

119. Filtering Data
12분

120. Paginating Data
11분

121. Sorting Data
11분

## 섹션 14: File Uploads (Task App)
0 / 8|1시간 23분
122. Section Intro: File Uploads
1분

123. Adding Support for File Uploads
19분

124. Validating File Uploads
15분

125. Validation Challenge
5분

126. Handling Express Errors
8분

127. Adding Images to User Profile
15분

128. Serving up Files
8분

129. Auto-Cropping and Image Formatting
12분

## 섹션 15: Sending Emails (Task App)
0 / 6|1시간 25분
130. Section Intro: Sending Emails
1분

131. Exploring SendGrid
13분

132. Sending Welcome and Cancelation Emails
16분

133. Environment Variables
19분

134. Creating a Production MongoDB Database
15분

135. Heroku Deployment
20분

## 섹션 16: Testing Node.js (Task App)
0 / 15|2시간 53분
136. Section Intro: Testing Node.js
2분

137. Jest Testing Framework
16분

138. Writing Tests and Assertions
18분

139. Writing Your Own Tests
6분

140. Testing Asynchronous Code
14분

141. Testing an Express Application: Part I
6분

142. Testing an Express Application: Part II
14분

143. Jest Setup and Teardown
14분

144. Testing with Authentication
13분

145. Advanced Assertions
13분

146. Mocking Libraries
6분

147. Wrapping up User Tests
16분

148. Setup Task Test Suite
15분

149. Testing with Task Data
16분

150. Bonus: Extra Test Ideas
3분
## 섹션 17: Real-Time Web Applications with Socket.io (Chat App)
0 / 24|4시간 46분
151. Section Intro: Real-Time Web Applications with Socket.io
1분

152. Creating the Chat App Project
13분

153. WebSockets
6분

154. Getting Started with Socket.io
12분

155. Socket.io Events
17분

156. Socket.io Events Challenge
16분

157. Broadcasting Events
6분

158. Sharing Your Location
15분

159. Event Acknowledgements
13분

160. Form and Button States
11분

161. Rendering Messages
13분

162. Rendering Location Messages
10분

163. Working with Time
20분

164. Timestamps for Location Messages
7분

165. Styling the Chat App
13분

166. Join Page
6분

167. Socket.io Rooms
15분

168. Storing Users: Part I
17분

169. Storing Users: Part II
8분

170. Tracking Users Joining and Leaving
14분

171. Sending Messages to Rooms
14분

172. Rendering User List
12분

173. Automatic Scrolling
16분

174. Deploying the Chat Application
8분

## 섹션 18: Wrapping Up
0 / 3|7분
175. Section Intro
1분

176. New Feature Ideas
4분

177. Bonus: What should I learn next?
3분