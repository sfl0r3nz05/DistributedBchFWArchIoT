const mongoose = require('mongoose');
const Manifest = require('./manifest');
const {Schema} = mongoose;

const updateRegisterSchema = new Schema({
    authorKey : {
        type : String,
        required : true
    },
    payload : {
        type : Buffer,
        required : true
    },
    manifest : {
        type : Manifest.schema,
        required : true
    },
    authorSign : {
        type : String,
        required : true
    },
    manifestSign : {
        type : String,
        required : true
    }

});
const UpdateRegister = mongoose.model('UpdateRegister',updateRegisterSchema);
module.exports = UpdateRegister;