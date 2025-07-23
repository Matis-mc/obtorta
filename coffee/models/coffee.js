const mongoose = require('mongoose');

const Coffee = mongoose.Schema({
    name: {type:String, required:true},
    brand: {type:String, required:true},
    power: {type:Number, required:true},
    package: {type:String, required:true},
    plant: {type:String, required:true},
});


module.exports = mongoose.model('Coffee', Coffee); 