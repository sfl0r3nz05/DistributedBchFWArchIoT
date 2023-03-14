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
    //build update object
    const update = {
        manifest : result.manifest,
        authorSign : result.authorSign,
        authorManifestSign : result.authorManifestSign,
    }
    return {
        status : 200,
        message : update
    }

}

module.exports = retrieve;