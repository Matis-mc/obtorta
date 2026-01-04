const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator')

const ExerciseStat = mongoose.Schema({
    idExercise: {type:String, required:true, unique:true},
    record: {type:Map, required:false, default: new Map([['0', '0']])},
    workload : {type:Map, required:false, default: new Map([['0', '0']])},
    nbSession : {type:Number, required:false, default: 1}
});

ExerciseStat.plugin(unique);

module.exports = mongoose.model('ExerciseStat', ExerciseStat); 