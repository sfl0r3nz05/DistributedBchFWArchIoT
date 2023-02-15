const {create} = require ('ipfs-http-client');
const config = require('../config/config.json');

const retrieveImageIPFS = async(CID) =>{
    const ipfs = await create({ url: config.ipfsURL });

    const resp = await ipfs.cat(CID);
    
    let content = [];
    for await (const chunk of resp) {
        content = [...content, ...chunk];
    }
    const raw = Buffer.from(content).toString('utf8')
    console.log(raw)

}

retrieveImageIPFS('QmVGtJ3tWYAotBwcwmRsdNqA9vtWZWkKCwxxLSwsBo3QFA');