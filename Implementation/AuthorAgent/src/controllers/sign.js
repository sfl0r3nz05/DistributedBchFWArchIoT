const crypto = require('crypto');


const sign = (req) =>{
    try {
        const message = req.body.message;
        const privateKey = req.body.privateKey;

        const messageDigest = crypto.createHash('sha384').update(message).digest('hex');

        const authorSign = crypto.privateEncrypt({
            key : privateKey, 
            padding : crypto.constants.RSA_PKCS1_PADDING,
        },Buffer.from(messageDigest)
        ).toString('base64');

        return {
            status : 200,
            message : authorSign
        }
    } catch (err){
        return {
            status : 500,
            message : err
        }
    }
    
}

module.exports = sign;