const Participant = require("../model/Participant");
const HerdEvent = require("../model/HerdEvent");
const GpxFile = require("../model/GpxFile");
const EventDto = require("../model/EventDto");
const JerseyVote = require("../model/JerseyVote");


exports.saveHerdEvent = async (name, date, localisation, distance, type) => {
    
    return await new HerdEvent({
            name:name,
            date:date,
            localisation:localisation,
            distance:distance,
            type:type
        }).save();
    }

exports.deleteHerdEvent = async(idEvent) => {
    await Participant.deleteMany({idEvent: idEvent});
    await GpxFile.deleteOne({idEvent: idEvent});
    await HerdEvent.deleteOne({_id: idEvent});
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
    console.log("delete participant : " + idParticipant + " from event " + idEvent);
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
    let gpx = await this.getGpxFileFromEvent(event._id);
    let participants = await this.getParticipantFromEvent(event._id);
    let eventDto = new EventDto(event._id, event.name, event.date, event.localisation, event.distance, event.type, participants, gpx);
    return eventDto;     
}

exports.getEventsDtos = async () => {
    let events = await this.getEvents();
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

exports.sendVote = async (email, votes) => {
    try {
        return await new JerseyVote({
        email: email,
        votes: votes
        }).save();
    }catch (e){
        console.log(e);
        return null;
    }
}

exports.getAllVotes = async () => {
    return await JerseyVote.find();
}