const crypto = require("crypto");



function verifySign (message, signedMessage, publicKey){
    var buffer = Buffer.from(signedMessage, "base64");
    var decrypted ="";
    try { 
        decrypted = crypto.publicDecrypt(publicKey,buffer);
        console.info('============= obtained message: ' + decrypted + ' ===========');
        return message.valueOf() == decrypted.valueOf();
    } catch (err){
        throw new Error('ERR_KEY_NOT_VERIFIABLE' + " obtained: " + decrypted + " expected: " + message);
    }
   
}

module.exports = verifySign;