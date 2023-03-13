const verifyDevice = require('../services/verify-device');
const callRetrieveUpdateCC = require('../services/call-retrieve-update-cc');
const retrieveImageIPFS = require('../services/retrieve-image-ipfs');

const retrieve = async(req) => {
    //verifies that the req has the correct keys.
    let  verifiable = verifyDevice(req);
    if(!verifiable){
        return {
            status : 405,
            message : 'Input not valid'
        }
    }
    //CALL CHAINCODE
    var result = await callRetrieveUpdateCC(req);
    if(result.status.toString().valueOf() !== '201'){
        return {
            status : result.status,
            message : result.message
        }
    }
    result = result.message.Record;
    console.log(result.CID.path.toString());
    //retrieve update payload from ipfs
    const resultCID = await retrieveImageIPFS(result.CID.path.toString(),result.manifest.payloadDigest);
    if(resultCID.status.toString().valueOf() !== '201'){
        return {
            status : resultCID.status,
            message : resultCID.message
        }
    }
    //build update object
    const update = {
        manifest : result.manifest,
        authorSign : result.authorSign,
        authorManifestSign : result.authorManifestSign,
        payload : resultCID.message
    }
    console.log("finished processing everything: " + Date.now())
    return {
        status : resultCID.status,
        message : update
    }

}

module.exports = retrieve;