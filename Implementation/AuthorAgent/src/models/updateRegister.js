const mongoose = require('mongoose');
const Manifest = require('./manifest');
const {Schema} = mongoose;

const updateRegisterSchema = new Schema({
    authorKey : {
        type : String,
        required : true
    },
    payload : {
        type : String,
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
    authorManifestSign : {
        type : String,
        required : true
    }

});
const UpdateRegister = mongoose.model('UpdateRegister',updateRegisterSchema);
module.exports = UpdateRegister;