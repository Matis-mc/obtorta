const mongoose = require('mongoose');

const Exercise = mongoose.Schema({
    name: {type:String, required:true},
    categories : {type:Array, required:true}
});

Exercise.index({ categories: 1 });

module.exports = mongoose.model('Exercise', Exercise); 