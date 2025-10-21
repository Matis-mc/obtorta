class EventDto{

    constructor(id, name, date, localisation, distance, type, participants, gpx){
        this._id = id;
        this.name = name;
        this.date = date
        this.localisation = localisation;
        this.distance = distance;
        this.type = type;
        this.participants = participants;
        this.gpx = gpx;
    }

}

module.exports = EventDto;