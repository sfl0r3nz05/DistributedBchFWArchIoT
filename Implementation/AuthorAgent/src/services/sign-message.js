const crypto = require('crypto');
const stringify = require('json-stringify-deterministic');

const signMessage = (message, privateKey, isJson) => {
    if(isJson){
        message = stringify(message);
    }
    //console.log(message);
    const messageDigest = crypto.createHash('sha384').update(message).digest('hex');

    const authorSign = crypto.privateEncrypt({
        key : privateKey, 
        padding : crypto.constants.RSA_PKCS1_PADDING,
    },Buffer.from(messageDigest)
    ).toString('base64');

    return {
        status : 200,
        message : {
            digest : messageDigest,
            sign : authorSign
        }
    }
}

module.exports = signMessage;