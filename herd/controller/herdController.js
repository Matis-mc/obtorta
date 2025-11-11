const JerseyVote = require("../model/JerseyVote");
const HerdService = require("../service/herdService");

exports.wakeUp = async(req,res,next) => {
    res.status(200).send("Show must go on !")
}

exports.createEvent = async(req, res, next) => {
    try{
        console.log(req.file);
        const event = await HerdService.saveHerdEvent(
            req.body.name,
            req.body.date,
            req.body.localisation,
            req.body.distance,
            req.body.type);

        if(req.body.participants != undefined){
            for (let p of participants){
                HerdService.saveParticipant(event._id, p.participant);
            }
        }
        if(req.file != undefined){
            HerdService.saveGPX(req.file.originalname, req.file.buffer, req.file.size, event._id);
        }
        res.status(201).send(event);
    } catch(error){
        console.error("Erreur lors de l'enregistrement de l'évenement : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement de l'évenement."});
    }
}

exports.getEvents = async(req, res, next) => {

    try {
        let eventDtos = await HerdService.getEventsDtos();
        if(eventDtos == null || eventDtos == undefined){
            return res.status(204).send();
        }
        res.status(200).send(eventDtos);
    } catch(error){
        console.error("Erreur lors de la recuperation des évènements : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des évènements."});
    }
}

exports.deleteEvent = async (req, res, next) => {
    try {
        HerdService.deleteHerdEvent(req.query.idEvent);
        res.status(204).send();
    } catch(error){
        console.error("Erreur lors de la suppression d'un évenement : " + error)
        res.status(500).send({message: "Erreur lors de la suppression d'un évenement."});
    }
}

exports.addParticipant = async(req, res, next) => {

    try {
        const participant = HerdService.saveParticipant(req.body.idEvent, req.body.participant);
        res.status(201).send(participant);
    } catch(error){
        console.error("Erreur lors de l'enregistrement de la participation à un évenement : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement de la participation à un évenement."});
    }
}

exports.getParticipant = async(req, res, next) => {

    try {
        let participant = HerdService.getParticipantFromEvent(req.query.event);
        res.status(200).send(participant);
    } catch(error){
        console.error("Erreur lors de la recuperation des participants : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des participants."});
    }

}

exports.deleteParticipant = async(req, res, next) => {

    try {
        let participant = HerdService.deleteParticipantFromEvent(req.query.participant, req.query.event);
        res.status(200).send(participant);
    } catch(error){
        console.error("Erreur lors de la suppression du participant : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation du participant."});
    }

}

exports.uploadGPX = async(req, res ,next) => {
    try {
        const fileLoaded = HerdService.saveGPX(req.file.originalname, req.file.buffer, req.file.size, req.query.event);
        res.status(201).send(fileLoaded._id);
    } catch(error){
        console.error("Erreur lors de l'enregistrement du gpx : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement du gpx."});
    }
}

exports.downloadGPX = async(req, res, next) => {

    try {
        const file = HerdService.getGpxFileFromEvent(req.query.event);
        if(file == null){
            res.status(204).send();
        }
        res.status(200).send(file)
    } catch(error){
        console.error("Erreur lors de la recuperation du fichier : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation du fichier."});
    }
}

exports.sendVote = async (req, res, next) => {
    try {
        const vote = await HerdService.sendVote(req.body.email, req.body.votes);
        if(vote == null){
            res.status(403).send({message:"Le participant a déjà voté."})
        }
        res.status(201).send(vote)
    } catch(error){
        console.error("Erreur lors de l'enregistrement du vote' : " + error)
        res.status(500).send({message: "Erreur lors de l'enregistrement du vote."});
    }
}

exports.getAllVotes = async (req, res, next) => {
    try {
        const votes = await HerdService.getAllVotes();
        res.status(200).send(votes);
    } catch(error){
        console.error("Erreur lors de la recuperation des votes : " + error)
        res.status(500).send({message: "Erreur lors de la recuperation des votes."});
    }
}

