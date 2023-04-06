const crypto = require('crypto');
const stringify = require('json-stringify-deterministic');
const Manifest = require('../../models/manifest');

const digest = (jsonObject) => {
    var newJson = JSON.parse(stringify(jsonObject));
    const payloadDigest = crypto.createHash('sha384').update(jsonObject.update.payload).digest('hex');
    newJson.update.manifest.payloadDigest = payloadDigest;
    let manifest = JSON.parse(stringify(newJson.update.manifest));
    if (!manifest.monotonicSequenceNumber || manifest.monotonicSequenceNumber === ""){
    var date = new Date();
    manifest.monotonicSequenceNumber = date;
    }
    delete manifest.manifestDigest;
    // console.log(stringify(manifest))
    const manifestDigest = crypto.createHash('sha384').update(stringify(manifest)).digest('hex');
    newJson.update.manifest.manifestDigest = manifestDigest;

    return newJson;
}

module.exports = digest;