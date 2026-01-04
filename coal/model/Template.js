const mongoose = require('mongoose');

const Template = mongoose.Schema({
    name : {type:String, required:false},
    date: {type:Date, required:true},
    idExecutions : {type:Array, required:true},
    categories : { type:Array, requires:true},
    description : {type:String, required:false}
});

module.exports = mongoose.model('Template', Template); 