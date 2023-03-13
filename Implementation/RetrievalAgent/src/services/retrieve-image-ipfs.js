const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');
const crypto = require('crypto');

//this method retrieves content from the IPFS network using a CID path.
const retrieveImageIPFS = async(CID, payload) =>{
    try {
        const ipfs = await create({ url: config.ipfsURL });
        console.log("retrieved IPFS: " + Date.now());
        const resp = await ipfs.cat(CID);
        let content = [];
        for await (const chunk of resp) {
            content = [...content, ...chunk];
        }
        console.log("processed IPFS: " + Date.now());
        var raw = Buffer.from(content).toString('base64')
        const payloadDigest = crypto.createHash('sha384').update(Buffer.from(raw)).digest('hex');
        console.log("payload Digest: " + payloadDigest)
        if(payloadDigest !== payload){
            raw = Buffer.from(content).toString('utf-8');
            const payloadDigest2 = crypto.createHash('sha384').update(Buffer.from(raw,'base64')).digest('hex');
            console.log("payload Digest2: " + payloadDigest2)
        }
        
        
        return {
            status : 201,
            message: raw
        }
    } catch (err){
        console.log(err)
        throw (err)
    }
    

}

module.exports = retrieveImageIPFS;

//retrieveImageIPFS('QmVGtJ3tWYAotBwcwmRsdNqA9vtWZWkKCwxxLSwsBo3QFA');