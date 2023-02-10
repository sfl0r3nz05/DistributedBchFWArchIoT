const crypto = require('crypto');
const stringify = require('json-stringify-deterministic');


// this method verifies that the update has not been modified since signed.
const verifyUpdate = (updateRegister, publicKey) => {
    const manifest = verifyManifest(updateRegister, publicKey);
    const payload = verifyPayload(updateRegister,publicKey);
    return (manifest && payload)
}

//this method verifies that the manifest has not been modified
const verifyManifest = (updateRegister, publicKey) => {
    //obtain manifest digest
    var manifest = JSON.parse(stringify(updateRegister.manifest));
    delete manifest.manifestDigest;
    console.info("Received update manifest:" + stringify(manifest))
    console.info("received manifest digest: " + stringify(updateRegister.manifest.manifestDigest))
    const manifestDigest = crypto.createHash('sha384').update(stringify(manifest)).digest('hex').toString();
    console.info("manifest digest: " + manifestDigest)
    //obtain signature content
    const buffer = Buffer.from(updateRegister.authorManifestSign,'base64');
    const signatureContent = crypto.publicDecrypt(publicKey,buffer).toString();
    console.info("manifest sign content: " + signatureContent)
    //compare results
    if(!((manifestDigest.valueOf() == signatureContent.valueOf()) && ((manifestDigest.valueOf() == updateRegister.manifest.manifestDigest.toString().valueOf() ))) ){
        throw new Error('ERR_MANIFEST_NOT_VERIFIABLE');
    }
}

//this method verifies that the payload has not been modified.
const verifyPayload = (updateRegister, publicKey) => {
    console.info("received manifest payloadDigest: " + stringify(updateRegister.manifest.payloadDigest))
    //obtain payload digest
    const payloadDigest = crypto.createHash('sha384').update(stringify(updateRegister.payload)).digest('hex');
    console.info("payload digest: " + payloadDigest)
    //obtain signature content
    const buffer = Buffer.from(updateRegister.authorSign,'base64');
    const signatureContent = crypto.publicDecrypt(publicKey,buffer).toString();
    console.info("author sign content: " + signatureContent)
    //compare results
    if(!((payloadDigest.valueOf() == signatureContent.valueOf()) && ((payloadDigest.valueOf() == updateRegister.manifest.payloadDigest.toString().valueOf() )) )){
        throw new Error('ERR_PAYLOAD_NOT_VERIFIABLE');
    }
}

module.exports = verifyUpdate;