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
consol.log(chalk.green.bold.inverse('Success!'))
```

- search "modbus", "redis" ...

13. Global npm Modules and nodemon
7분

## 섹션 4: File System and Command Line Args (Notes App)
0 / 11|2시간 15분
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