const mongoose = require('mongoose')


// connection string
mongoose.connect('mongodb://localhost:27017/RemainderServerDB', {
    useNewUrlParser: true
})

// model creation
const User = mongoose.model('User', {
    id:Number,
    uname: String,
    password: String,
    eventName: String,
    eventDate: Number,
    events: []
})

// export model
module.exports = {
    User
}