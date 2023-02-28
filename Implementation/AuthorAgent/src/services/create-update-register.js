const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

// it receives a req containing and Update and a registerKey
// it returns an UpdateRegister object created with the input, without the _id fields from mongoose.
const createUpdateRegister = (req, registerKey) => {
    var update = req.body.update;
    try {
        update = JSON.parse(update);
    } catch (err){
        //update doesnt need parse
    }
    let manifesto = new Manifest(update.manifest);
    if (!manifesto.monotonicSequenceNumber || manifesto.monotonicSequenceNumber === ""){
    var date = new Date();
    manifesto.monotonicSequenceNumber = date;
    }
    let updateRegister = new UpdateRegister({
    authorKey : registerKey,
    manifest : manifesto,
    authorSign : update.authorSign,
    authorManifestSign : update.authorManifestSign,
    payload : update.payload
    });
    var up = updateRegister.toObject();
    delete up._id;
    delete up.manifest._id;
    return up;
}

module.exports = createUpdateRegister;