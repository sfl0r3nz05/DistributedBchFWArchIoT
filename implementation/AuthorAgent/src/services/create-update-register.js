const crypto = require('crypto');
const stringify = require('json-stringify-deterministic')
// it receives a req containing and Update and a registerKey
// it returns an UpdateRegister object created with the input, without the _id fields from mongoose.
const createUpdateRegister = (req, registerKey) => {
    var update = req.body.update;

    var updateObject = {
        authorKey : registerKey,
        manifest : update.manifest,
        authorSign : update.authorSign,
        authorManifestSign : update.authorManifestSign,
        payload : update.payload
    }; 

    return updateObject;
}

module.exports = createUpdateRegister;