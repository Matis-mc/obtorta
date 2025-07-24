const mongoose = require('mongoose');

const Tasting = mongoose.Schema({
    idUser: {type:String, required:true},
    idCoffee: {type:String, required:true},
    idPot: {type:String, required:true},
    globalRate : {type:Number, required:true},
    milk: {type:String, required:true},
    sugar: {type:Boolean, required:false},
    power: {type:Number, required:true},
    taste: {type:Number, required:true},
    view: {type:Number, required:true}
})

module.exports = mongoose.model('Tasting', Tasting);