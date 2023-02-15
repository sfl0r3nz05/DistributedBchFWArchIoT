const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');

const storeImageIPFS = async(payload) =>{
    const ipfs = await create({ url: config.ipfsURL });

    const result = await ipfs.add(Buffer.from(payload));
    
    return result;

}

module.exports = storeImageIPFS;