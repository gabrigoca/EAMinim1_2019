'use strict'

/*
Conte totes les rutes, requerin al controlador (studentCtrl...) que es on 
estan implementades 
 */
const express = require('express')
const api = express.Router()
const apiStudents =require('./student')
const apiSubjects =require('./subject')


api.use('/student', apiStudents)
api.use('/subject', apiSubjects)



module.exports =  api
