const mongoose = require('mongoose');
const {Schema} = mongoose;

const manifestSchema = new Schema({
    versionID : {
        type : String,
        required : true,
        unique : true
    },
    monotonicSequenceNumber : {
        type : String,
        required : true
    },
    vendorID : {
        type : String,
        required : false
    },
    classID : {
        type : String,
        required : true
    },
    payloadFormat : {
        type : String,
        required : true
    },
    payloadProcessing : {
        type : String,
        required : false
    },
    storageLocation : {
        type : String,
        required : true
    },
    payloadIndicator : {
        type : String,
        required : false
    },
    payloadDigest : {
        type : String,
        required : true
    },
    manifestDigest : {
        type : String,
        required : true
    },
    size : {
        type : Number,
        required : true
    },
    aditionalInstructions : {
        type : String,
        required : false
    },
    dependencies : {
        type : [String],
        required : true
    },
    encryptionWrapper : {
        type : String,
        required : true
    },
    payload : {
        type : String,
        required : false
    }
});
const Manifest = mongoose.model('Manifest',manifestSchema);
module.exports = Manifest;