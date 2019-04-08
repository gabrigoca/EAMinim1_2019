'use strict'
//Llista de rutes per als bikes

const express = require('express')
const apiBikes = express.Router()
const bikeCtrl = require('../controllers/bike')

apiBikes.get('/', bikeCtrl.getBikes)
apiBikes.get('/:bikeId', bikeCtrl.getBike)
apiBikes.post('/', bikeCtrl.saveBike)
apiBikes.put('/:bikeId', bikeCtrl.updateBike)
apiBikes.delete('/:bikeId', bikeCtrl.deleteBike)


module.exports =  apiBikes