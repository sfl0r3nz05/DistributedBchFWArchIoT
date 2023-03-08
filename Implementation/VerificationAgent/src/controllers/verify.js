const verifyUpdate = require('../services/verify-update');
const fs = require('fs');

const verify = async(req) => {
    try{
        var payload;
        if(req.file){
            payload = fs.readFileSync(req.file.path,'base64');
        } else {
            payload = req.body.payload
        }
        var publicKey;
        if(req.body.deviceID.publicKey){
            publicKey = req.body.deviceID.publicKey;
        } else {
            publicKey = JSON.parse(req.body.deviceID).publicKey;
        }
        var update;
        if(req.body.update.manifest){
            update = req.body.update;
        } else {
            update = JSON.parse(req.body.update);
        }

        var verified = verifyUpdate(publicKey,update,payload);
        return ({
            status : 200,
            message : 'Update Verified: ' + verified
        })
    } catch (err){
        return ({
            status : 403,
            message : err
        })
    }
}

module.exports = verify;