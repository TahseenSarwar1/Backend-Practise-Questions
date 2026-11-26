const fs = require('fs')
const path = require('path')
const eventEmitter = require('events');

const registrationEmitter = new eventEmitter();

registrationEmitter.on('studentRegistered', (registration) => {
    const logMessage = `Student ${registration.studentId} registered for course ${registration.courseId}\n`;
    fs.appendFileSync(logsFile, logMessage);
})

const coursesFile = path.join(__dirname, 'courses.json')
const studentsFile = path.join(__dirname, 'students.json')
const registrationFile = path.join(__dirname, 'registrations.json')
const logsFile = path.join(__dirname, 'registrationLogs.txt')


function registerStudent(studentId, courseId){
    const student = JSON.parse(fs.readFileSync(studentsFile, 'utf-8'))
    const course = JSON.parse(fs.readFileSync(coursesFile, 'utf-8'))
    const registrations = JSON.parse(fs.readFileSync(registrationFile, 'utf-8'))


    for(let i = 0; i < student.length; i++){
        if(student[i].id !== studentId){
            throw new Error('Student not found.')
        }
    }
    for(let i = 0; i < course.length; i++){
        if(course[i].id !== courseId){
            throw new Error('Course not found.')
        }
    }
    for(let i = 0; i < registrations.length; i++){
        if(registrations[i].studentId === studentId && registrations[i].courseId === courseId){
            throw new Error('Student already registered for this course.')
        }
    }


    if(registrations.length === 0){
        const registrationId = 1 
    }
    else{
        const registrationId = registrations[registrations.length - 1].id + 1
    }   

    const registration ={
        id: registrationId,
        studentId: studentId,
        courseId: courseId,
        registrationDate: new Date().toISOString()
    }

    registrations.push(registration);

    fs.writeFileSync(registrationFile, JSON.stringify(registrations, null, 2), 'utf-8');

    registrationEmitter.emit('studentRegistered', registration);

    return registration;
}

module.exports ={
    registerStudent,
    registrationEmitter
}