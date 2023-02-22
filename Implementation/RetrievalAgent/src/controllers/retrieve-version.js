const verifyDevice = require('../services/verify-device');
const callRetrieveUpdateCC = require('../services/call-retrieve-update-cc');

const retrieveVersion = async(req) => {
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
    //console.log(JSON.stringify(result.message[0]));
    return {
        status : result.status,
        message : result.message.toString()
    }

}

module.exports = retrieveVersion;