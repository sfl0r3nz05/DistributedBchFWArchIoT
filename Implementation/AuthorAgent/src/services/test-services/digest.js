const crypto = require('crypto');

const digest = (jsonObject) => {
    var newJson = jsonObject;
    var manifest = jsonObject.update.manifest;
    delete manifest.manifestDigest;
    const manifestDigest = crypto.createHash('sha384').update(JSON.stringify(manifest)).digest('hex');
    newJson.update.manifest.manifestDigest = manifestDigest;

    const payloadDigest = crypto.createHash('sha384').update(JSON.stringify(jsonObject.update.payload)).digest('hex');
    newJson.update.manifest.payloadDigest = payloadDigest;

    return newJson;
}

module.exports = digest;