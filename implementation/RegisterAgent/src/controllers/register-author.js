const verifyKeys = require("../services/verify-register-petition");
const callRegisterAuthorCC = require('../services/call-register-author-cc');

//This controller manages the process of verifying that req contains an update and a public key
//and sending the petition to the blockchain gateway.
const registerAuthor = async(req) =>{
    //verify req keys.
    let verifiable = verifyKeys(req);
    if(!verifiable){
        return {
            status : 405,
            message : 'Input not valid'
        }
    }
    //ask blockchain gateway to execute contract
    const result = await callRegisterAuthorCC(req);
    return {
        status : result.status,
        message : result.message
    }
}
module.exports = registerAuthor;