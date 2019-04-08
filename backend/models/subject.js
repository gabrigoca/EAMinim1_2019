'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new mongoose.Schema({
        name: {type: String,unique: true},
        students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Subject',subjectSchema);
