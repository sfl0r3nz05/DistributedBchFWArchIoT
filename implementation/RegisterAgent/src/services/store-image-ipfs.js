const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');
const fs = require('fs')

//this methods stores a file in the IPFS network and returns the generated CID object.
const storeImageIPFS = async(payloadBody,payloadFile) =>{
    var payload;
    if(payloadFile){
       payload = fs.readFileSync(payloadFile.path.toString());
    } else {
        payload = payloadBody;
    }

    const ipfs = await create({ url: config.ipfsURL });

    const result = await ipfs.add(Buffer.from(payload), {pin : true});
    
    return result;

}

module.exports = storeImageIPFS;