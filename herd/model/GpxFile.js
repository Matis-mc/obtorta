const { default: mongoose } = require("mongoose")


const GpxFile = mongoose.Schema({
    name: {type:String, required:true},
    file: {type:Buffer, required:true},
    size: {type:Number, required:true},
    idEvent: {type:String, required:true}
})

module.exports = mongoose.model('GpxFile', GpxFile); 