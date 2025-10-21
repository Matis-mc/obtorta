const { default: mongoose } = require("mongoose")

const Participant = mongoose.Schema({
    idEvent:{type:String, required:true},
    participant:{type:String, required:true}
})

module.exports = mongoose.model('Participant', Participant); 