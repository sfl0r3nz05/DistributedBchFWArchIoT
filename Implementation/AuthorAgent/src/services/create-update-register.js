const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

// it receives a req containing and Update and a registerKey
// it returns an UpdateRegister object created with the input, without the _id fields from mongoose.
const createUpdateRegister = (req, registerKey) => {
    let manifesto = new Manifest(req.body.update.manifest);
    if (!manifesto.monotonicSequenceNumber || manifesto.monotonicSequenceNumber === ""){
    var date = new Date();
    manifesto.monotonicSequenceNumber = date;
    }
    let updateRegister = new UpdateRegister({
    authorKey : registerKey,
    manifest : manifesto,
    authorSign : req.body.update.authorSign,
    authorManifestSign : req.body.update.authorManifestSign,
    payload : req.body.update.payload
    });
    var up = updateRegister.toObject();
    delete up._id;
    delete up.manifest._id;
    return up;
}

module.exports = createUpdateRegister;