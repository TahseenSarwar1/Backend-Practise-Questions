const eventManager = require('events');
const fs = require('fs')
const path = require('path')

const logFile = path.join(__dirname, "logs.txt");

const event = new eventManager();

event.on('userLogin',(username)=>{
    console.log(`User logged in: ${username}`)

    fs.appendFile(logFile, `userLogin: ${username}\n`, (err)=>{
        if(err){
            console.log(err)
        }
    })
})
event.on('userLogout',(username)=>{
    console.log(`User logged out: ${username}`)

    fs.appendFile(logFile, `userLogout: ${username}\n`, (err)=>{
        if(err){
            console.log(err)
        }
    })
})

module.exports = event;