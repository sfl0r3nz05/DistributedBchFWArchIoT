const fs = require('fs');
const path = require('path');
var FormData = require('form-data');
const requestUpdateRegisterMultipart = require('./update-register-petition');
const stringify = require('json-stringify-deterministic');
const digest = require('./digest');
const sign = require('./sign');
const crypto = require('crypto')



// This service will create an update petition and send it to the author agent.
var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../','data','update-register.json'),'utf-8'));
json.update.manifest.versionID = 'Z_9'+Date.now()
var payload = fs.createReadStream(path.resolve(__dirname,'../','data','BCM2046A2-iMac2009Bluetooth.bin'));
var payloadToDigest = fs.readFileSync(path.resolve(__dirname,'../','data','BCM2046A2-iMac2009Bluetooth.bin'),'base64');
var publicKey = fs.readFileSync(path.resolve(__dirname,'../','data','public_key'),'utf-8');
var privateKey = fs.readFileSync(path.resolve(__dirname,'../','data','private_key'),'utf-8');

var digestedJSON = digest(json, payloadToDigest);
var signedJSON = sign(digestedJSON,privateKey);

/* console.log("manifestDigest: "+ signedJSON.update.manifest.manifestDigest);
const signatureContent = crypto.publicDecrypt(publicKey,Buffer.from(signedJSON.update.authorManifestSign,'base64')).toString();
console.log("signature content: " + signatureContent) */
//console.log(payloadToDigest);

var form = new FormData();
form.append('publicKey', publicKey);
form.append('update', stringify(signedJSON.update));
form.append('payload', payload);

/* var newJSON = JSON.parse(stringify(signedJSON));
delete newJSON.update.manifest.manifestDigest;
const manifestDigest = crypto.createHash('sha384').update(stringify(newJSON.update.manifest)).digest('hex');
console.log("onceAgaincalculateDigest" +manifestDigest); */

try{
    console.log(requestUpdateRegisterMultipart(form, {verifyStatus : ()=> true}).data);
} catch (error){
    console.log(error.response.data);
}
