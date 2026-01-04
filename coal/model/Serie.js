const mongoose = require('mongoose');

const Serie = mongoose.Schema({
    reps : {type:Number, required:true},
    weight: {type:Number, required:true},
    warmup: {type:Boolean, required:false, default:Boolean.false},
    restTime : {type:Number, required:false}
});

module.exports = mongoose.model('Serie', Serie); 