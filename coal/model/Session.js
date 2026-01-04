const mongoose = require('mongoose');

const Session = mongoose.Schema({
    idTemplate : {type:String, required: false},
    name : {type:String, required:false},
    date: {type:Date, required:true},
    duration:{type:Number, required:false},
    idExecutions : {type:Array, required:true},
    categories : { type:Array, requires:true}});

module.exports = mongoose.model('Session', Session); 