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
    //check if  result was succesful
    if(result.status.toString().valueOf() !== '201'){
        return {
            status : result.status,
            message : result.message
        }
    }
    result = result.message.Record;
    console.log(result.CID.path.toString());
    //store update payload in ipfs
    const resultCID = await retrieveImageIPFS(result.CID.path.toString());
    if(resultCID.status.toString().valueOf() !== '201'){
        return {
            status : resultCID.status,
            message : resultCID.message
        }
    }
    const update = {
        manifest : result.manifest,
        authorSign : result.authorSign,
        authorManifestSign : result.authorManifestSign,
        payload : resultCID.message
    }
    //console.log(update)
    return {
        status : resultCID.status,
        message : JSON.stringify(update,null,'\t')
    }

}

module.exports = retrieve;