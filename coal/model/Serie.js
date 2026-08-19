const mongoose = require('mongoose');
const {getConnection} = require('../../config/database');

const Serie = mongoose.Schema({
    reps : {type:Number, required:true},
    weight: {type:Number, required:true},
    warmup: {type:Boolean, required:false, default:Boolean.false},
    restTime : {type:Number, required:false}
});

module.exports = getConnection('coal').model('Serie', Serie);