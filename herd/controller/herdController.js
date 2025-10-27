const Participant = require("../model/Participant");
const HerdService = require("../service/herdService");

exports.wakeUp = async(req,res,next) => {
    res.status(200).send("Show must go on !")
}

exports.createEvent = async(req, res, next) => {
    try{
        console.log(req.body);
        const event = HerdService.saveHerdEvent(
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
        if(req.body.file != undefined){
            HerdService.saveGPX(req.file.originalname, req.file.buffer, req.file.size, event);
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
        let participant = HerdService.deleteParticipantFromEvent(req.params.participant, req.params.event);
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

