const crypto = require('crypto');
const stringify = require('json-stringify-deterministic');


// this method verifies that the update has not been modified since signed.
const verifyUpdate = (publicKey, update, payload) => {
    const fields = verifyUpdateFields(update);
    const manifest = verifyManifest(publicKey,update);
    const pay = verifyPayload(publicKey,update, payload);
    verified = (manifest && pay  && fields);
    if (!verified){
        throw new Error('Update not verifiable. Check the update format.');
    }
    return true;
}

//this method verifies that the manifest has not been modified
const verifyManifest = (publicKey, update) => {
    try {
        //obtain manifest digest
    console.log('update: ');
    console.log(update);
    var manifest = JSON.parse(stringify(update.manifest));
    console.log(manifest)
    delete manifest.manifestDigest;
    const manifestDigest = crypto.createHash('sha384')
    .update(stringify(manifest)).digest('hex').toString();
    //obtain signature content
    const buffer = Buffer.from(update.authorManifestSign,'base64');
    const signatureContent = crypto.publicDecrypt(publicKey,buffer).toString();
    //compare results
    if(!((manifestDigest.valueOf() == signatureContent.valueOf()) && ((manifestDigest.valueOf() == update.manifest.manifestDigest.toString().valueOf() ))) ){
        console.info("manifestDigest: " + update.manifest.manifestDigest);
        console.info("Sign: "+ signatureContent)
        console.info("obtained manifestDigest: "+ manifestDigest);
        throw new Error('ERR_MANIFEST_NOT_VERIFIABLE');
    }
    return true;
    } catch (err) {
        console.info(err);
        throw new Error('ERR_MANIFEST_NOT_VERIFIABLE');
    }
    
}

//this method verifies that the payload has not been modified.
const verifyPayload = (publicKey , update, payload) => {
    try {
        //console.info("received manifest payloadDigest: " + stringify(updateRegister.manifest.payloadDigest))
    //obtain payload digest
    const payloadDigest = crypto.createHash('sha384').update(Buffer.from(payload)).digest('hex');
    //console.info("payload digest: " + payloadDigest)
    //obtain signature content
    const buffer = Buffer.from(update.authorSign,'base64');
    const signatureContent = crypto.publicDecrypt(publicKey,buffer).toString();
    //console.info("author sign content: " + signatureContent)
    //compare results
    if(!((payloadDigest.valueOf() == signatureContent.valueOf()) && ((payloadDigest.valueOf() == update.manifest.payloadDigest.toString().valueOf() )) )){
        console.info("payloadDigest: " + update.manifest.payloadDigest);
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
    var expected = ['manifest','authorSign','authorManifestSign'];
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