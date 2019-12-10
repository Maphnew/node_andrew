require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5de64ee587212d5e90e1bdbe').then((task) => {
//     console.log('task: ', task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log('result: ', result)
// }).catch((e) => {
//     console.log(e)
// })

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