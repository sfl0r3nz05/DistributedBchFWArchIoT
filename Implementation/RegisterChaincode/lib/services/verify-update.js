const crypto = require('crypto');
const stringify = require('json-stringify-deterministic');
const verifyRegisterKey = require('./verify-register-key');


// this method verifies that the update has not been modified since signed.
const verifyUpdate = (updateRegister, publicKey) => {
    //console.info("verifying: " + JSON.stringify(updateRegister,null,'\t'))
    const fields = verifyUpdateFields(updateRegister);
    //const key = verifyRegisterKey(publicKey,updateRegister.authorKey);
    const manifest = verifyManifest(updateRegister, publicKey);
    const payload = verifyPayload(updateRegister,publicKey);
    verified = (manifest && payload  && fields); //&& key
    if (!verified){
        throw new Error('Update not verifiable. Check the update format.');
    }
    return true;
}

//this method verifies that the manifest has not been modified
const verifyManifest = (updateRegister, publicKey) => {
    try {
        //obtain manifest digest
    var manifest = JSON.parse(stringify(updateRegister.manifest));
    delete manifest.manifestDigest;
    const manifestDigest = crypto.createHash('sha384')
    .update(stringify(manifest)).digest('hex').toString();
    //obtain signature content
    const buffer = Buffer.from(updateRegister.authorManifestSign,'base64');
    const signatureContent = crypto.publicDecrypt(publicKey,buffer).toString();
    //compare results
    if(!((manifestDigest.valueOf() == signatureContent.valueOf()) && ((manifestDigest.valueOf() == updateRegister.manifest.manifestDigest.toString().valueOf() ))) ){
        throw new Error('ERR_MANIFEST_NOT_VERIFIABLE');
    }
    return true;
    } catch (err) {
        console.info(err);
        throw new Error('ERR_MANIFEST_NOT_VERIFIABLE');
    }
    
}

//this method verifies that the payload has not been modified.
const verifyPayload = (updateRegister, publicKey) => {
    try {
        //console.info("received manifest payloadDigest: " + stringify(updateRegister.manifest.payloadDigest))
    //obtain payload digest
    const payloadDigest = crypto.createHash('sha384').update(updateRegister.payload).digest('hex');
    //console.info("payload digest: " + payloadDigest)
    //obtain signature content
    const buffer = Buffer.from(updateRegister.authorSign,'base64');
    const signatureContent = crypto.publicDecrypt(publicKey,buffer).toString();
    //console.info("author sign content: " + signatureContent)
    //compare results
    if(!((payloadDigest.valueOf() == signatureContent.valueOf()) && ((payloadDigest.valueOf() == updateRegister.manifest.payloadDigest.toString().valueOf() )) )){
        console.info("payloadDigest: " + updateRegister.manifest.payloadDigest);
        console.info("Sign: "+ signatureContent)
        console.info("obtained payloadDigest: "+ payloadDigest);
        throw new Error('ERR_PAYLOAD_NOT_VERIFIABLE');
    }
    return true;
    } catch (err){
        console.info(err);
        throw new Error('ERR_PAYLOAD_NOT_VERIFIABLE');
    }
}

function readRequest(req){
    var keys = Object.keys(req);
    return keys;
}

function verifyPetition(keys, expected){
    var verified = keys.sort().join(',')=== expected.sort().join(',');
    if (!verified){
        console.info("obtained: " + keys + " expected: " + expected);
    }
    return verified;
}
//this function verifies that the received manifest has a correct format.
function verifyManifestFields(manifestKeys,expectedKeys,mandatoryManifest){
    var listOne = manifestKeys.sort();
    var listTwo = expectedKeys.sort();
    var listThree = mandatoryManifest.sort();
    for (let i = 0; i< manifestKeys.length; i++){
        if (!(listTwo.includes(listOne[i]))){
            console.log(listOne[i] + " field not allowed");
            throw new Error('ERR_INCORRECT_MANIFEST_FORMAT');
        }
    }
    for (let i = 0; i< mandatoryManifest.length; i++){
        if (!(listOne.includes(listThree[i]))){
            console.log(listThree[i] + "mandatory field not present in manifest");
            throw new Error('ERR_INCORRECT_MANIFEST_FORMAT');
        }
    }
    return true;
}


// this function verifies that the received UpdateREgister has the correct format.
function verifyUpdateFields(req){
    var keys = readRequest(req);
    var expected = ['authorKey','manifest','authorSign','authorManifestSign','payload'];
    if(verifyPetition(keys, expected)){
        var manifestKeys = readRequest(req.manifest);
        var mandatoryManifest = 
        ['versionID','monotonicSequenceNumber','classID','payloadFormat',
        'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
            'dependencies', 'encryptionWrapper'];
        var expectedManifest = 
        ['versionID','monotonicSequenceNumber','vendorID','classID','payloadFormat',
        'payloadProcessing', 'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
        'aditionalInstructions', 'dependencies', 'encryptionWrapper', 'payloadIndicator', 
        'payload'];
        return verifyManifestFields(manifestKeys,expectedManifest,mandatoryManifest);
    } else return false;
}

module.exports = verifyUpdate;