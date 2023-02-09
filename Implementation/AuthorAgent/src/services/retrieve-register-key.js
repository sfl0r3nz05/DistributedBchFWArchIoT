const KeyPair = require('../models/keyPair');
const mongoose = require('mongoose');

// receives a publicKey
//returns the associated registerKey from db.
const retrieveRegisterKey = async(publicKey) => {
    const conn = mongoose.createConnection();
    await mongoose.connect('mongodb://mongo:27017');
    const keypair = await KeyPair.findOne({publicKey : publicKey.toString()});
    conn.close();
    if(!keypair){
        return false;
    } else {
        return keypair.registerKey;
    }
}

module.exports = retrieveRegisterKey;