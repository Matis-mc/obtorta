const { Mongoose } = require("mongoose");
const HerdEvent = require("../model/HerdEvent");
const Participant = require("../model/Participant");
const GpxFile = require("../model/GpxFile");

exports.wakeUp = async(req,res,next) => {
    res.status(200).send("Show must go on !")
}

exports.createEvent = async(req, res, next) => {
    try{
        const event = await new HerdEvent({
            name:req.body.name,
            date:req.body.date,
            localisation:req.body.localisation,
            distance:req.body.distance,
            type:req.body.type
        }).save();
        res.status(201).send(event);
    } catch(error){
        console.error("Erreur lors de l'enregistrement de l'évenement : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement de l'évenement."});
    }
}

exports.getEvents = async(req,res,next) => {

    try {
        let events = await HerdEvent.find();
        if(events == null){
            res.status(204).send();
        }
        res.status(200).send(events);
    } catch(error){
        console.error("Erreur lors de la recuperation des évènements : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des évènements."});
    }
}

exports.addParticipant = async(req, res, next) => {

    try {
        const participant = await new Participant({
            idEvent: req.body.idEvent,
            participant: req.body.participant
        })
        .save();
        res.status(201).send(participant);
    } catch(error){
        console.error("Erreur lors de l'enregistrement de la participation à un évenement : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement de la participation à un évenement."});
    }
}

exports.getParticipant = async(req, res, next) => {

    try {
        console.log(req);
        let participant = await Participant.find({idEvent:req.query.event});
        res.status(200).send(participant);
    } catch(error){
        console.error("Erreur lors de la recuperation des participants : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des participants."});
    }

}

exports.deleteParticipant = async(req, res, next) => {

    try {
        let participant = await Participant.deleteOne({
            _id: req.params.participant,
            idEvent: req.params.event
        });
        res.status(200).send(participant);
    } catch(error){
        console.error("Erreur lors de la suppression du participant : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation du participant."});
    }

}

exports.uploadGPX = async(req, res ,next) => {
    try {
        const fileLoaded = await new GpxFile({
            name: req.file.originalname,
            file: req.file.buffer,
            size: req.file.size,
            idEvent: req.query.event
        }).save();
        res.status(201).send(fileLoaded._id);
    } catch(error){
        console.error("Erreur lors de l'enregistrement du gpx : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement du gpx."});
    }
}

exports.downloadGPX = async(req, res, next) => {

    try {
        const file = await GpxFile.find({idEvent:req.query.event});
        if(file == null){
            res.status(204).send();
        }
        res.status(200).send(file)
    } catch(error){
        console.error("Erreur lors de la recuperation du fichier : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation du fichier."});
    }

}

