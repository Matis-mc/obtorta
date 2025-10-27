const Participant = require("../model/Participant");
const HerdEvent = require("../model/HerdEvent");
const GpxFile = require("../model/GpxFile");
const EventDto = require("../model/EventDto");


exports.saveHerdEvent = async (name, date, localisation, distance, type) => {
    
    return await new HerdEvent({
            name:req.body.name,
            date:req.body.date,
            localisation:req.body.localisation,
            distance:req.body.distance,
            type:req.body.type
        }).save();
    }

exports.saveParticipant = async(idEvent, participant) => {
    
    return await new Participant({
                        idEvent: idEvent,
                        participant: participant
        }).save();
    }

exports.saveGPX = async(name, buffer, size, idEvent) => {

    return await new GpxFile({
                    name: name,
                    file: buffer,
                    size: size,
                    idEvent: idEvent
        }).save();
}

exports.deleteParticipantFromEvent = async (idParticipant, idEvent) => {
    return await Participant.deleteOne({
                _id: idParticipant,
                idEvent: idEvent
        });
}

exports.getParticipantFromEvent = async (idEvent) => {
    return await Participant.find({idEvent:idEvent});
}

exports.getGpxFileFromEvent = async (idEvent) => {
    return await GpxFile.find({idEvent:idEvent})
}

exports.getEvents = async () => {
    return await HerdEvent.find();
}

exports.getEventDto = async (event) => {
    let gpx = this.getGpxFileFromEvent(e._id);
    let participants = this.getParticipantFromEvent(e._id);
    let eventDto = new EventDto(e._id, e.name, e.date, e.localisation, e.distance, e.type, participants, gpx);
    return eventDto;     
}

exports.getEventsDtos = async () => {
    let events = this.getEvents();
    if(events == null){
        return null;
    }
    let eventDtos = [];
    for (let e of events){
        let eventDto = await this.getEventDto(e);
        eventDtos.push(eventDto);
    }
    return eventDtos;
}