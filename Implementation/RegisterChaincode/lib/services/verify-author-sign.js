const crypto = require("crypto");


//verifies the content of the signed message using the public key.
function verifySign (message, signedMessage, publicKey){
    var buffer = Buffer.from(signedMessage, "base64");
    var decrypted ="";
    const messageHash = crypto.createHash('sha384').update(message).digest('hex');
    try { 
        decrypted = crypto.publicDecrypt(publicKey,buffer);
        console.info('============= obtained message: ' + decrypted.toString() + 'received hashed:' + messageHash + ' ===========');
        return messageHash.valueOf() == decrypted.valueOf();
    } catch (err){
        throw new Error('ERR_KEY_NOT_VERIFIABLE');
    }
   
}

module.exports = verifySign;