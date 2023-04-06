const crypto = require('crypto');

const sign = (jsonObject,privateKey) => {
    const authorSign = crypto.privateEncrypt({
        key : privateKey, 
        padding : crypto.constants.RSA_PKCS1_PADDING,
    },Buffer.from(jsonObject.update.manifest.payloadDigest)
    ).toString('base64');

    const authorManifestSign = crypto.privateEncrypt({
        key : privateKey, 
        padding : crypto.constants.RSA_PKCS1_PADDING,
    },Buffer.from(jsonObject.update.manifest.manifestDigest)
    ).toString('base64');

    jsonObject.update.authorSign = authorSign;
    jsonObject.update.authorManifestSign = authorManifestSign;

    return jsonObject;
}

module.exports = sign;