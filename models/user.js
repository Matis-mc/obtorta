const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator')

const User = mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    firstname : {type:String, required:false},
    lastname : {type:String, required:false}
});

User.plugin(unique);

module.exports = mongoose.model('User', user); 