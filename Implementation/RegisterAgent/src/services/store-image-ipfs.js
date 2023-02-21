const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');

//this methods stores a file in the IPFS network and returns the generated CID object.
const storeImageIPFS = async(payload) =>{
    const ipfs = await create({ url: config.ipfsURL });

    const result = await ipfs.add(Buffer.from(payload), {pin : true});
    
    return result;

}

module.exports = storeImageIPFS;