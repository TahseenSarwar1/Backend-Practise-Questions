const {registerStudent, registrationEmitter } = require('./registrationManager.js')

const studentId = Number(process.argv[2]);
const courseId = Number(process.argv[3]);

let eventTriggered = false;

registrationEmitter.on('studentRegistered', () => {
    eventTriggered = true;
});

try {
    registerStudent(studentId, courseId);

    console.log('Student registered successfully!');

    if (eventTriggered) {
        console.log('Registration event triggered.');
    }

} catch (error) {
    console.log(error.message);
}