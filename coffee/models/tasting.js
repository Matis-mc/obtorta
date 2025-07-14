const mongoose = require('mongoose');
const coffee = require('./coffee');
const pot = require('./pot');

const Tasting = mongoose.Schema({
    idUser: {type:number, required:true},
    coffee: {type:coffee, required:true},
    pot: {type:pot, required:true},
    globalRate : {type:number, required:true},
    milk: {type:String, required:true},
    sugar: {type:Boolean, required:false},
    power: {type:number, required:true},
    taste: {type:number, required:true},
    view: {type:number, required:true}
})

module.exports = mongoose.model('Tasting', Tasting); 