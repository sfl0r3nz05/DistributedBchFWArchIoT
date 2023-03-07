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
        var verified = verifyUpdate(req.body.publicKey,req.body.update,payload);
        return ({
            status : 200,
            message : 'Update Verified: ' + verified
        })
    } catch (err){
        return ({
            status : 500,
            message : err
        })
    }
}

module.exports = verify;