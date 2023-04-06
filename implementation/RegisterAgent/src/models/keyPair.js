const mongoose = require('mongoose');
const {Schema} = mongoose;

const keyPairSchema = new Schema({
    publicKey: {
        type : String,
        required : true,
        unique : true
    },
    registerKey: {
        type: String,
        required : true
    }
});
const KeyPair = mongoose.model('KeyPair',keyPairSchema);
module.exports = KeyPair;