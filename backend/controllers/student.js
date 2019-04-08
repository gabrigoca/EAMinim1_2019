'use strict'

const Student = require('../models/student')
const Subject = require('../models/subject')
const Phone = require('../models/phone')

function getStudent (req,res){
    console.log('GET /api/student/:studentId')

    let studentId = req.params.studentId

    Student.findById(studentId,(err, student) => {
        if(err)
            return res.status(500).send({message: `Error searching the student: ${err}`})

        if(!student)
            return res.status(404).send({message: `Student does not exist`})

        res.status(200).send({student: student})
    })
}

function getStudents (req,res){
    console.log('GET /api/student/')

    Student.find({},(err, students) => {
        if(err)
            return res.status(500).send({message: `Error searching the student: ${err}`})

        if(!students)
            return res.status(404).send({message: `There are no students`})

        res.status(200).send({students})
    })
}

function saveStudent(req,res){
    console.log('POST /api/student')
    console.log(req.body)

    let student = new Student()
    student.name = req.body.name
    student.adress= req.body.adress

    student.save((err,studentStored) => {
        if(err)
            return res.status(500).send({message: `Error saving in the DB: ${err}`})

        res.status(200).send({student: studentStored})

    })
}

function updateStudent (req,res){
    console.log('PUT /api/student/:studentId')

    let studentId = req.params.studentId
    let update = req.body

    Student.findByIdAndUpdate(studentId,update,(err, studentUpdated) => {
        if(err)
            return res.status(500).send({message: `Error updating the student: ${err}`})

        if(!studentUpdated)
            return res.status(404).send({message: `Student does not exist`})

        res.status(200).send({student: studentUpdated})
    })
}

function deleteStudent (req,res){
    console.log('DELETE /api/student/:studentId')

    let studentId = req.params.studentId

    Student.findById(studentId,(err, student) => {
        if(err)
            return res.status(500).send({message: `Error deleting the student: ${err}`})

        if(!student)
            return res.status(404).send({message: `Student does not exist`})

        student.remove(err =>{
            if(err)
                return res.status(500).send({message: `Error deleting the student: ${err}`})

            res.status(200).send({message: "Student deleted correctly"})
        })
    })
}


function addPhone (req,res){
    console.log('POST /api/student/phone')

    let studentId = req.body.studentId
    let phone = new Phone()
    phone.name = req.body.name
    phone.adress= req.body.adress

    Student.findById(studentId,(err, student) => {
        if(err)
            return res.status(500).send({message: `Error searching the student: ${err}`})

        if(!student)
            return res.status(404).send({message: `Student does not exist`})

        student.phones.push(phone)
        student.save((err,studentStored) => {
            if(err)
                return res.status(500).send({message: `Error saving in the DB: ${err}`})

            res.status(200).send({student: studentStored})

        })
    })

}



module.exports={
    getStudent,
    getStudents,
    saveStudent,
    updateStudent,
    deleteStudent,
    addPhone,


}
