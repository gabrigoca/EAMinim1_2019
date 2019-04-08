'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Telefon
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhoneSchema = Schema({
    name: String,
    adress: {type: String, required: true },
})

module.exports = mongoose.model('Phone',PhoneSchema)