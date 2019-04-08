'use strict'

const Subject = require('../models/subject')
const Student = require('../models/student')

function getSubjects(req,res){
    //Funcio per obtindre el nom de totes les assignature
    console.log("Peticio de obtindre totes les asignatures")
    //Només mostrem la llista de noms de les assignatures
    Subject.find({},{name:1},(err, asigs)=>{
        if(err) {
            return res.status(500).send({message: `Error al obtener las asignaturas: ${err}`})
        }
        else if(!asigs.length) {
            console.log("No hay ninguna asignatura")
            return res.status(403).send({message: `No hay asignaturas`})
        }
        else {
            console.log("Enviando lista de asignaturas"+asigs)
            res.status(200).send(asigs);
        }
    })

}

function getSubject(req,res){
    //Funcio per obtindre una asignatura en base al seu ID
    console.log("Peticio de obtindre una asignatura")
    let subjectId = req.params.subjectId
    //Al demanar només una asignatura enviem tota la llista de alumnes
    Subject.findById(subjectId, (err, asig)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener las asignaturas: ${err}`})
        else if(!asig)
            return res.status(403).send({message: `No existe ninguna asignatura con ese ID `+req.params.subjectId})
        else
            res.status(200).send(asig);
    })

}

function updateSubject (req,res){
    console.log('PUT /api/subject/:subjectId')

    let subjectId = req.params.subjectId
    let update = req.body

    Subject.findByIdAndUpdate(subjectId,update,(err, subjectUpdated) => {
        if(err)
            return res.status(500).send({message: `Error updating the subject: ${err}`})

        if(!subjectUpdated)
            return res.status(404).send({message: `Subject does not exist`})

        res.status(200).send({subject: subjectUpdated})
    })
}

function deleteSubject (req,res){
    console.log('DELETE /api/subject/:subjectId')

    let subjectId = req.params.subjectId

    Subject.findById(subjectId,(err, subject) => {
        if(err)
            return res.status(500).send({message: `Error deleting the subject: ${err}`})

        if(!subject)
            return res.status(404).send({message: `Subject does not exist`})

        subject.remove(err =>{
            if(err)
                return res.status(500).send({message: `Error deleting the subject: ${err}`})

            res.status(200).send({message: "Subject deleted correctly"})
        })
    })
}


function saveSubject(req,res){
    //Funció per afagir una assignatura
    const subjectNew = new Subject({
        name: req.body.name,
        students: req.body.students,
    })

    console.log("Petició d'afagir la seguent asignatura:"+subjectNew)
    Subject.find({name: req.body.name}).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al añadir la asignatura: ${err}`})}
        if (!subj.length){
            subjectNew.save((err) => {
                if(err) {
                    console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
                    return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
                }
                console.log("Assignatura: "+req.body.name+" agregada correctament")
                res.status(200).send(subjectNew)
            } )     }
        else {
            console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
            return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
        }
    })

}


function addStudent (req,res){
    console.log('POST /api/student/phone')

    let studentId = req.body.studentId
    let subjectId = req.body.subjectId

    Subject.findById(subjectId,(err, subject) => {
        if(err)
            return res.status(500).send({message: `Error searching the subject: ${err}`})

        if(!subject)
            return res.status(404).send({message: `Subject does not exist`})

        Student.findById(studentId,(err,student)=>{
            if(err)
                return res.status(500).send({message: `Error searching the student: ${err}`})

            if(!student)
                return res.status(404).send({message: `Student does not exist`})

            subject.students.push(studentId)
            subject.save((err,subjectStored) => {
                if(err)
                    return res.status(500).send({message: `Error saving in the DB: ${err}`})

                res.status(200).send({subject: subjectStored})

            })
        })

    })

}

function getSubjectStudents (req,res){
    console.log('GET /api/subject/students/:subjectId')

    let subjectId = req.params.subjectId

    Subject.findById(subjectId,(err, subject) => {
        if(err)
            return res.status(500).send({message: `Error searching the subject: ${err}`})

        if(!subject)
            return res.status(404).send({message: `Subject does not exist`})

        Student.find({'_id': { $in: subject.students}}, function(err, studentsList){
            res.status(200).send({students: studentsList})
        })
    })
}

module.exports={
    getSubjects,
    getSubject,
    saveSubject,
    updateSubject,
    deleteSubject,
    addStudent,
    getSubjectStudents
}
