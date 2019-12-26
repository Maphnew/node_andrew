const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNweUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
})