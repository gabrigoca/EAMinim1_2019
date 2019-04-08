'use strict'

const Station = require('../models/station')
const Bike = require('../models/bike')

function getStations(req,res){
    //Funcio per obtindre el nom,descripcio i estat de totes les assignature
    console.log("Peticio de obtindre totes les estacions")
    Station.find({},(err, stations)=>{
        if(err) {
            return res.status(500).send({message: `Error al obtener las estaciones: ${err}`})
        }
        else if(!stations.length) {
            console.log("No hay ninguna asignatura")
            return res.status(403).send({message: `No hay estaciones`})
        }
        else {
            console.log("Enviando lista de estaciones"+stations)
            res.status(200).send(stations);
        }
    })

}

function getStation(req,res){
    //Funcio per obtindre una asignatura en base al seu ID
    console.log("Peticio de obtindre una estacio")
    let stationId = req.params.stationId
    //Al demanar només una asignatura enviem tota la llista de alumnes
    Station.findById(stationId, (err, asig)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener las estacions: ${err}`})
        else if(!asig)
            return res.status(403).send({message: `No existe ninguna asignatura con ese ID `+req.params.stationId})
        else
            res.status(200).send(asig);
    })

}

function updateStation (req,res){
    console.log('PUT /api/station/:stationId')

    let stationId = req.params.stationId
    let update = req.body

    Station.findByIdAndUpdate(stationId,update,(err, stationUpdated) => {
        if(err)
            return res.status(500).send({message: `Error updating the station: ${err}`})

        if(!stationUpdated)
            return res.status(404).send({message: `Station does not exist`})

        res.status(200).send({station: stationUpdated})
    })
}

function deleteStation (req,res){
    console.log('DELETE /api/station/:stationId')

    let stationId = req.params.stationId

    Station.findById(stationId,(err, station) => {
        if(err)
            return res.status(500).send({message: `Error deleting the station: ${err}`})

        if(!station)
            return res.status(404).send({message: `Station does not exist`})

        station.remove(err =>{
            if(err)
                return res.status(500).send({message: `Error deleting the station: ${err}`})

            res.status(200).send({message: "Station deleted correctly"})
        })
    })
}


function saveStation(req,res){
    //Funció per afagir una assignatura
    const stationNew = new Station({
        name: req.body.name,
        bikes: req.body.bikes,
        description: req.body.description,
    })
    if (req.body.bikes)
        stationNew.state=true
    else stationNew.state=false


    console.log("Petició d'afagir la seguent asignatura:"+stationNew)
    Station.find({name: req.body.name}).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al añadir la asignatura: ${err}`})}
        if (!subj.length){
            stationNew.save((err) => {
                if(err) {
                    console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
                    return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
                }
                console.log("Assignatura: "+req.body.name+" agregada correctament")
                res.status(200).send(stationNew)
            } )     }
        else {
            console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
            return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
        }
    })

}


function addBike (req,res){
    console.log('POST /api/station/addBike')

    let bikeId = req.body.bikeId
    let stationId = req.body.stationId

    Station.findById(stationId,(err, station) => {
        if(err)
            return res.status(500).send({message: `Error searching the station: ${err}`})

        if(!station)
            return res.status(404).send({message: `Station does not exist`})

        Bike.findById(bikeId,(err,bike)=>{
            if(err)
                return res.status(500).send({message: `Error searching the bike: ${err}`})

            if(!bike)
                return res.status(404).send({message: `Bike does not exist`})
            bike.assigned=true
            Bike.findByIdAndUpdate(bike._id,bike,(err, bikeUpdated) => {
                if(err)
                    return res.status(500).send({message: `Error updating the bike: ${err}`})

                if(!bikeUpdated)
                    return res.status(404).send({message: `Bike does not exist`})

                station.bikes.push(bikeId)
                station.state=true
                station.save((err,stationStored) => {
                    if(err)
                        return res.status(500).send({message: `Error saving in the DB: ${err}`})

                    res.status(200).send({station: stationStored})

                })
            })

        })

    })

}

function getStationBikes (req,res){
    console.log('GET /api/station/bikes/:stationId')

    let stationId = req.params.stationId

    Station.findById(stationId,(err, station) => {
        if(err)
            return res.status(500).send({message: `Error searching the station: ${err}`})

        if(!station)
            return res.status(404).send({message: `Station does not exist`})

        Bike.find({'_id': { $in: station.bikes}}, function(err, bikesList){
            res.status(200).send(bikesList)
        })
    })
}

module.exports={
    getStations,
    getStation,
    saveStation,
    updateStation,
    deleteStation,
    addBike,
    getStationBikes
}
