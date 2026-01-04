const mongoose = require('mongoose');

const Execution = mongoose.Schema({
    idInstance: {type:String, required:true},
    idOccurences : {type:Array, required:false}
});

module.exports = mongoose.model('Execution', Execution); 