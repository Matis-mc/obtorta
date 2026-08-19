const mongoose = require('mongoose');
const {getConnection} = require('../../config/database');

const Pot = mongoose.Schema({
    idUser:{type:String, required:true},
    asset:{type:String, required:true},
    label:{type:String, required:true},
    type:{type:String, required:true},
})

module.exports = getConnection('coffee').model('Pot', Pot);