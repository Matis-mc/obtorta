const mongoose = require('mongoose');
const {getConnection} = require('../../config/database');

const Exercise = mongoose.Schema({
    name: {type:String, required:true},
    categories : {type:Array, required:true}
});

Exercise.index({ categories: 1 });

module.exports = getConnection('coal').model('Exercise', Exercise);