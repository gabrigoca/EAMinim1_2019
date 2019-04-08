'use strict'

const Bike = require('../models/bike')
const Station = require('../models/station')

function getBike (req,res){
    console.log('GET /api/bike/:bikeId')

    let bikeId = req.params.bikeId

    Bike.findById(bikeId,(err, bike) => {
        if(err)
            return res.status(500).send({message: `Error searching the bike: ${err}`})

        if(!bike)
            return res.status(404).send({message: `Bike does not exist`})

        res.status(200).send({bike: bike})
    })
}

function getBikes (req,res){
    console.log('GET /api/bike/')

    Bike.find({},(err, bikes) => {
        if(err)
            return res.status(500).send({message: `Error searching the bike: ${err}`})

        if(!bikes)
            return res.status(404).send({message: `There are no bikes`})

        res.status(200).send({bikes})
    })
}

function saveBike(req,res){
    console.log('POST /api/bike')
    console.log(req.body)

    let bike = new Bike()
    bike.name = req.body.name
    bike.distance= req.body.distance
    bike.description=req.body.description
    bike.assigned=false

    bike.save((err,bikeStored) => {
        if(err)
            return res.status(500).send({message: `Error saving in the DB: ${err}`})

        res.status(200).send({bike: bikeStored})

    })
}

function updateBike (req,res){
    console.log('PUT /api/bike/:bikeId')

    let bikeId = req.params.bikeId
    let update = req.body

    Bike.findByIdAndUpdate(bikeId,update,(err, bikeUpdated) => {
        if(err)
            return res.status(500).send({message: `Error updating the bike: ${err}`})

        if(!bikeUpdated)
            return res.status(404).send({message: `Bike does not exist`})

        res.status(200).send({bike: bikeUpdated})
    })
}

function deleteBike (req,res){
    console.log('DELETE /api/bike/:bikeId')

    let bikeId = req.params.bikeId

    Bike.findById(bikeId,(err, bike) => {
        if(err)
            return res.status(500).send({message: `Error deleting the bike: ${err}`})

        if(!bike)
            return res.status(404).send({message: `Bike does not exist`})

        bike.remove(err =>{
            if(err)
                return res.status(500).send({message: `Error deleting the bike: ${err}`})

            res.status(200).send({message: "Bike deleted correctly"})
        })
    })
}


/*
function addPhone (req,res){
    console.log('POST /api/bike/phone')

    let bikeId = req.body.bikeId
    let phone = new Phone()
    phone.name = req.body.name
    phone.adress= req.body.adress

    Bike.findById(bikeId,(err, bike) => {
        if(err)
            return res.status(500).send({message: `Error searching the bike: ${err}`})

        if(!bike)
            return res.status(404).send({message: `Bike does not exist`})

        bike.phones.push(phone)
        bike.save((err,bikeStored) => {
            if(err)
                return res.status(500).send({message: `Error saving in the DB: ${err}`})

            res.status(200).send({bike: bikeStored})

        })
    })

}

*/

module.exports={
    getBike,
    getBikes,
    saveBike,
    updateBike,
    deleteBike,


}
