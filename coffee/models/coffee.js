const mongoose = require('mongoose');
const _package = require('./package');
const plant = require('./plant');

const Coffee = mongoose.Schema({
    name: {type:String, required:true},
    brand: {type:String, required:true},
    power: {type:number, required:true},
    package: {type:_package, required:true},
    plant: {type:plant, required:true},
});


module.exports = mongoose.model('Coffee', Coffee); 