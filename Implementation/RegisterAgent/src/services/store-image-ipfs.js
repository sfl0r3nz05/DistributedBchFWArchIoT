const {create} = require ('ipfs-http-client');

const storeImageIPFS = async(payload) =>{
    const ipfs = await create({ url: "http://172.27.0.13:5001" });

    const result = await ipfs.add(Buffer.from(payload));
    
    return result;

}

module.exports = storeImageIPFS;