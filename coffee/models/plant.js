const mongoose = require('mongoose');

const Plant = mongoose.Schema({
    id:number,
    name: {type:String, required:true},
    asset: {type:String, required:true},
    proportion: {type:number, required:false}
})

module.exports = mongoose.model('Plant', Plant); 