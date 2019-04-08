'use strict'

const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {type: String,unique: true},
    address: String,
    phones:[{name: String, address: {type: String}}]
});

module.exports = mongoose.model('Student',studentSchema);
