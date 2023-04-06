const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path')
//this method retrieves content from the IPFS network using a CID path.
const retrieveImageIPFS = async(CID, payload) =>{
    try {
        const ipfs = await create({ url: config.ipfsURL });
        console.log("retrieved IPFS: " + Date.now());
        
        //console.log("res: " + resp.toString());
        let content = [];
        for await (const chunk of ipfs.cat(CID)) {
            content.push(chunk);
        }
        console.log("processed IPFS: " + Date.now());
        console.log("expected payload: " + payload)
        var raw = Buffer.concat(content).toString('base64')
        const payloadDigest = crypto.createHash('sha384').update(Buffer.from(raw)).digest('hex');
        console.log("payload Digest: " + payloadDigest)
        if(payloadDigest !== payload){
            raw = Buffer.concat(content).toString('utf-8');
            const payloadDigest2 = crypto.createHash('sha384').update(Buffer.from(raw,'base64')).digest('hex');
            console.log("payload Digest2: " + payloadDigest2)
            fs.writeFileSync(path.resolve(__dirname,'../payload/payload'),raw)
        } else {
            fs.writeFileSync(path.resolve(__dirname,'../payload/payload'),Buffer.from(raw,'base64'));
        }
        
        return {
            status : 201,
            message: CID.path
        }
    } catch (err){
        console.log(err)
        throw (err)
    }
    

}

module.exports = retrieveImageIPFS;

//retrieveImageIPFS('QmVGtJ3tWYAotBwcwmRsdNqA9vtWZWkKCwxxLSwsBo3QFA');