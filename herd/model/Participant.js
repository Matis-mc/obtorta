const { default: mongoose } = require("mongoose")
const {getConnection} = require('../../config/database');

const Participant = mongoose.Schema({
    idEvent:{type:String, required:true},
    participant:{type:String, required:true}
})

module.exports = getConnection('herd').model('Participant', Participant);