'use strict'
//Llista de rutes per als stations

const express = require('express')
const apiStations = express.Router()
const stationCtrl = require('../controllers/station')

apiStations.get('/', stationCtrl.getStations)
apiStations.get('/:stationId', stationCtrl.getStation)
apiStations.post('/', stationCtrl.saveStation)
apiStations.put('/:stationId', stationCtrl.updateStation)
apiStations.delete('/:stationId', stationCtrl.deleteStation)
apiStations.post('/addBike', stationCtrl.addBike)

apiStations.get('/bikes/:stationId', stationCtrl.getStationBikes)

module.exports =  apiStations