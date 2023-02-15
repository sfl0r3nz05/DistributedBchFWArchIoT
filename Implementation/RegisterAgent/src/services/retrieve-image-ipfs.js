const {create} = require ('ipfs-http-client');

const retrieveImageIPFS = async(CID) =>{
    const ipfs = await create({ url: "http://172.27.0.13:5001" });

    const resp = await ipfs.cat(CID);
    
    let content = [];
    for await (const chunk of resp) {
        content = [...content, ...chunk];
    }
    const raw = Buffer.from(content).toString('utf8')
    console.log(raw)

}

retrieveImageIPFS('QmVGtJ3tWYAotBwcwmRsdNqA9vtWZWkKCwxxLSwsBo3QFA');