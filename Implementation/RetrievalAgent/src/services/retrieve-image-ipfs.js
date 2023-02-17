const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');

//this method retrieves content from the IPFS network using a CID path.
const retrieveImageIPFS = async(CID) =>{
    const ipfs = await create({ url: config.ipfsURL });

    const resp = await ipfs.cat(CID);
    
    let content = [];
    for await (const chunk of resp) {
        content = [...content, ...chunk];
    }
    const raw = Buffer.from(content).toString('utf8')
    console.log(raw)
    
    return {
        status : 201,
        message: raw
    }

}

module.exports = retrieveImageIPFS;

//retrieveImageIPFS('QmVGtJ3tWYAotBwcwmRsdNqA9vtWZWkKCwxxLSwsBo3QFA');