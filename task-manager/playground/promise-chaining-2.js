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