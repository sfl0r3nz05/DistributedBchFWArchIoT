const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

//This service creates and updateRegister Object from the req body.
const createUpdateRegister = (req) => {
    let manifesto = new Manifest(req.body.manifest);
    let updateRegister = new UpdateRegister({
    authorKey : req.body.authorKey,
    manifest : manifesto,
    authorSign : req.body.authorSign,
    manifestSign : req.body.authorManifestSign
    });
    return updateRegister;
}

module.exports = createUpdateRegister;