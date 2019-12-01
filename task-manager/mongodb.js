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

    // db.collection('users').findOne({ _id: new ObjectID("5de37fa1487d64659c560132") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })
    // db.collection('users').find({ age: 33 }).toArray((error, users) => {
    //     console.log(users)
    // })
    
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
})

