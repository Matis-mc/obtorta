const { default: mongoose } = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");


const JerseyVote = mongoose.Schema({
    email: {type:String, required:true, unique:true},
    votes: {type:Array, required:true}
})

module.exports = mongoose.model('JerseyVote', JerseyVote); 