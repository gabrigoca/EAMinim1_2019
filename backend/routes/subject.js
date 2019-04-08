'use strict'
//Llista de rutes per als subjects

const express = require('express')
const apiSubjects = express.Router()
const subjectCtrl = require('../controllers/subject')

apiSubjects.get('/', subjectCtrl.getSubjects)
apiSubjects.get('/:subjectId', subjectCtrl.getSubject)
apiSubjects.post('/', subjectCtrl.saveSubject)
apiSubjects.put('/:subjectId', subjectCtrl.updateSubject)
apiSubjects.delete('/:subjectId', subjectCtrl.deleteSubject)
apiSubjects.post('/addStudent', subjectCtrl.addStudent)

apiSubjects.get('/students/:subjectId', subjectCtrl.getSubjectStudents)

module.exports =  apiSubjects