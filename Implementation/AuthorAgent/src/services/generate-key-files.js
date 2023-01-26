var crypto = require('crypto');
var fs = require('fs');
const path = require('path');

function generateKeyFiles() {

    const keyPair = crypto.generateKeyPairSync('rsa', {
       modulusLength: 520,
       publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
       },
       privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: ''
       }
    });
 
    // Creating the public key file with the below name
    fs.writeFileSync("public_key", keyPair.publicKey);
    fs.writeFileSync("private_key", keyPair.privateKey);
 }

 module.exports = generateKeyFiles;