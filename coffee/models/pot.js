const mongoose = require('mongoose');

const Pot = mongoose.Schema({
    idUser:{type:String, required:true},
    asset:{type:String, required:true},
    label:{type:String, required:true},
    type:{type:String, required:true},
})

module.exports = mongoose.model('Pot', Pot); 