const mongoose = require('mongoose');
const {getConnection} = require('../../config/database');

const Execution = mongoose.Schema({
    idInstance: {type:String, required:true},
    idOccurences : {type:Array, required:false}
});

module.exports = getConnection('coal').model('Execution', Execution);