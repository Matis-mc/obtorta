const { default: mongoose } = require("mongoose");
const {getConnection} = require('../../config/database');
const mongooseUniqueValidator = require("mongoose-unique-validator");


const JerseyVote = mongoose.Schema({
    email: {type:String, required:true, unique:true},
    votes: {type:Array, required:true}
})

module.exports = getConnection('herd').model('JerseyVote', JerseyVote);