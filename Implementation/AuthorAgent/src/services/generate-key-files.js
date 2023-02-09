var crypto = require('crypto');
var fs = require('fs');
const path = require('path');


//this function generates a public private key pair and writes it to local storage. It is not used but
//it is stored for documentation purposes.
function generateKeyFiles() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
       modulusLength: 2048,
       publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
       },
       privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
       }
    });
 
    // Creating the public key file with the below name
    fs.writeFileSync("public_key", keyPair.publicKey);
    fs.writeFileSync("private_key", keyPair.privateKey);
 }

 module.exports = generateKeyFiles;