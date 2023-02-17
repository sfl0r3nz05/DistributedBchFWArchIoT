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
    const result = await callRetrieveUpdateCC(req);
    //check if  result was succesful
    if(result.status.toString().valueOf() !== '201'){
        return {
            status : result.status,
            message : result.message
        }
    }
    console.log(result.message[0].Record.CID.path.toString());
    //store update payload in ipfs
    const resultCID = await retrieveImageIPFS(result.message[0].Record.CID.path.toString());
    console.log(resultCID);
    return {
        status : resultCID.status,
        message : resultCID.message
    }

}

module.exports = retrieve;