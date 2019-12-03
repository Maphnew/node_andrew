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

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const task = new Tasks({
//     description: 'Laundry',
//     completed: false
// })

// task.save().then((task) => {
//     console.log(laundry)
// }).catch((error) => {
//     console.log('Error!', error)
// })