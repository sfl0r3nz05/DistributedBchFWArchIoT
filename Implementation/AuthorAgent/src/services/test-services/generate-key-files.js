var crypto = require('crypto');
var fs = require('fs');
const path = require('path');


//this function generates a public private key pair and writes it to local storage. It is not used but
//it is stored for documentation purposes.
function generateKeyFiles() {
   const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      // The standard secure default length for RSA keys is 2048 bits
      modulusLength: 2048,
      publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
          padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
          padding: crypto.constants.RSA_PKCS1_PADDING
      },
  });
 
    // Creating the public key file with the below name
    fs.writeFileSync(path.resolve(__dirname, '../../',"public_key"), publicKey);
    fs.writeFileSync(path.resolve(__dirname, '../../',"private_key"), privateKey);


    const message = "message";
    
   const signedMessage = crypto.privateEncrypt({
         key : Buffer.from(privateKey), 
         padding : crypto.constants.RSA_PKCS1_PADDING,
   },Buffer.from(message)
   ).toString('base64');
   
   const decrypt = crypto.publicDecrypt(publicKey,Buffer.from(signedMessage, 'base64')).toString();
   var json = {
         message: message,
         signedMessage : signedMessage,
         publicKey : publicKey,
         decrypt : decrypt
   };

   const signedMessage2 = crypto.privateEncrypt({
      key : Buffer.from(fs.readFileSync(path.resolve(__dirname,'../../','private_key'),'utf8')), 
      padding : crypto.constants.RSA_PKCS1_PADDING,
},Buffer.from(message)
).toString('base64');
   const decrypt2 = crypto.publicDecrypt(fs.readFileSync(path.resolve(__dirname,'../../','public_key'),'utf8'),Buffer.from(signedMessage2, 'base64')).toString();
   var json2 = {
         message: message,
         signedMessage2 : signedMessage2,
         publicKey : fs.readFileSync(path.resolve(__dirname,'../../','public_key'),'utf8'),
         decrypt2 : decrypt2
   };

   console.log(JSON.stringify(json,null,'\t'))
   console.log(JSON.stringify(json2,null,'\t'))
 }

 generateKeyFiles()

 module.exports = generateKeyFiles;