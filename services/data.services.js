const { json } = require('express')
const jwt = require('jsonwebtoken')
const db = require('./db')
users = {
    1000: { id: 1000, uname: "Ramu", password: "1000", eventName: "marriage", eventDate: 20, events: [] },
    1001: { id: 1001, uname: "Raju", password: "1001", eventName: "marriage", eventDate: 20, events: [] }
}
const register = (id, uname, password) => {
    return db.User.findOne({ id }).then(user => {
        if (user) {
            return {
                statusCode: 401,
                status: false,
                message: "account already exists..please login!!"
            }
        }
        else {
            const newUser = new db.User({
                id,
                uname,
                password,
                events: []
            })
            newUser.save()
            return {
                statusCode: 200,
                status: true,
                message: "account successfully created!!"
            }
        }
    })
}

const login = (id, password) => {
    return db.User.findOne({
        id,
        password
    }).then(user => {
        if (user) {
            currentId = id
            currentUserName = user.uname

            // token generation
            const token = jwt.sign({
                currentIdd: id
            }, 'supersecretkey123')

            return {
                statusCode: 200,
                status: true,
                message: "Login success",
                currentId,
                currentUserName,
                token
            }
        }
        return {
            statusCode: 401,
            status: false,
            message: "Invalid credentials"
        }
    })
}

const event = (req, eventName, eventDate) => {
    id = req.currentIdd
    return db.User.findOne({
        id
    }).then(user => {
        if (user) {
            user.events.push({
                ref:ref,
                eventName: eventName,
                eventDate: eventDate
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: "Event added successfully"
            }
        }

        return {
            statusCode: 401,
            status: false,
            message: "invalid credentials"
        }

    })
}

const eventHistory = (req) => {
    id = req.currentIdd
    return db.User.findOne({
        id
    }).then(user => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                events: user.events
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "invalid credentials"
            }
        }
    })
}
const deleteevent = (req, eventName, eventDate) => {
    id = req.currentIdd

    return db.User.findOne({
        id
        
    }).then(user => {
        // var result=Boolean(user.events.filter(date=>date.eventName==eventName&&date.eventDate==eventDate))
        // console.log(result);
        if (user) {
            console.log(user.events.find(d=>d.eventName==eventName),"222");
            // console.log({eventName:eventName});
            // console.log({eventDate:eventDate});
            // var val=user.events.filter(date => date.{eventName:eventName} == eventName && date.{eventDate:eventDate} == eventDate)
            // console.log(user.events.filter(date=>date.eventName==eventName&&date.eventDate==eventDate));
            var val=Boolean(user.events.eventName==eventName && user.events.eventDate==eventDate)
            // console.log(val);
            // console.log(user.events.eventName==eventName&&user.events.eventDate==eventDate);
            
            if (val) {
                // user.events.pull({
                //     eventName,
                //     eventDate
                // })
                user.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "Event removed successfully"
                }
               
                
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Event not found"
                }
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "Invalid credentials"
            }
        }
    })
}
const deleteAcc = (id) => {
    return db.User.deleteOne({ id }).then(user => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                message: "Account deleted successfully"
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "request denied"
            }
        }
    })
}


module.exports = {
    register,
    login,
    event,
    eventHistory,
    deleteevent,
    deleteAcc
}
