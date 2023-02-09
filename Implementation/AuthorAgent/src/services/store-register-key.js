const KeyPair = require('../models/keyPair');
const mongoose = require('mongoose');

// receives a publicKey and a registerKey.
// generates a KeyPair object and stores it in db.
const storeRegisterKey = async(publicKey, registerKey) => {
    const conn = mongoose.createConnection();
    await mongoose.connect('mongodb://mongo:27017');
    let keypair = new KeyPair({
    publicKey : publicKey.toString('base64'),
    registerKey : registerKey
    });
    var keyObject = keypair.toObject();
    delete keyObject._id;
    await KeyPair.findOneAndUpdate({'publicKey': keypair.publicKey}, keyObject, {upsert: true});
    conn.close();
    return {
        status : 201,
        message : 'The Registration was succesful. Register key available in the keyStore: '+ keypair.registerKey + " DO NOT MISS THIS KEY. It is MANDATORY for registering updates for the given public key"
    };
}

module.exports = storeRegisterKey;
      