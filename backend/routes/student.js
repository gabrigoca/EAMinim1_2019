'use strict'
//Llista de rutes per als students

const express = require('express')
const apiStudents = express.Router()
const studentCtrl = require('../controllers/student')

apiStudents.get('/', studentCtrl.getStudents)
apiStudents.get('/:studentId', studentCtrl.getStudent)
apiStudents.post('/', studentCtrl.saveStudent)
apiStudents.put('/:studentId', studentCtrl.updateStudent)
apiStudents.delete('/:studentId', studentCtrl.deleteStudent)
apiStudents.post('/addPhone', studentCtrl.addPhone)

module.exports =  apiStudents