const crypto = require('crypto');
const signMessage = require('../services/sign-message');
const fs = require('fs')

const sign = (req) =>{
    try {
        var message;
        const privateKey = req.body.privateKey;
        var isJson = false

        if(req.file){ // if there is a file, sign payload
            message = fs.readFileSync(req.file.path,'base64');
        } else if(req.body.payload) {
            message = req.body.payload;
        } else if(req.body.message.versionID){// Else if manifest sign manifest
            message = req.body.message;
            delete message.manifestDigest;
            isJson = true;
        } else {//else sign message
            message = req.body.message;
        }

        return signMessage(message,privateKey, isJson);
        
    } catch (err){
        console.log(err)
        return {
            status : 500,
            message : err
        }
    }
    
}

module.exports = sign;