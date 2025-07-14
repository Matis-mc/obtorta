const mongoose = require('mongoose');

const Package = mongoose.Schema({
    asset: {type:String, required:true},
    label: {type:String, required:false}
})

module.exports = mongoose.model('Package', Package); 