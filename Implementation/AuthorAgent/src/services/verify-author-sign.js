const crypto = require("crypto");



function verifySign (message, signedMessage, publicKey){
    var buffer = Buffer.from(signedMessage, "base64");
    var decrypted = crypto.publicDecrypt(publicKey,buffer);
    console.log(decrypted.toString("utf8"));

    return message.toString("utf8") == decrypted.toString("utf8");
}

module.exports = verifySign;