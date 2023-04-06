const verifyDevice = require('../services/verify-device');
const callRetrieveVersionCC = require('../services/call-retrieve-version-cc');

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
    const result = await callRetrieveVersionCC(req);
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