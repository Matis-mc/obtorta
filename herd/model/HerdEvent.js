const { default: mongoose } = require("mongoose")

const HerdEvent = mongoose.Schema({
    name: {type:String, required:true},
    date: {type:Date, required:true},
    localisation: {type:String, required:true},
    distance: {type:String, required:true},
    type: {type:String, required:true}
})

module.exports = mongoose.model('HerdEvent', HerdEvent); 