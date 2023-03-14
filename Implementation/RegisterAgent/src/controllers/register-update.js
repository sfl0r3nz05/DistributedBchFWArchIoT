const verifyUpdate = require("../services/verify-update");
const createUpdateRegister = require('../services/create-update-register');
const callRegisterUpdateCC = require('../services/call-register-update-cc');
const storeImageIPFS = require('../services/store-image-ipfs');
const callRegisterCIDCC = require('../services/call-register-cid-cc');
const path = require('path');
const fs = require('fs')

//this controller mamanges the process for asking for an update to be stored in the blockchain.
const registerUpdate = async(req) =>{
    //verifies that the req has the correct keys.
    let  verifiable = verifyUpdate(req);
    if(!verifiable){
        return {
            status : 405,
            message : 'Input not valid'
        }
    }
    //create an UpdateRegister Object in case we need to store it.
    //const updateRegister = createUpdateRegister(req);
    //Store update on db
    
    //CALL CHAINCODE
    const result = await callRegisterUpdateCC(req);
    fs.appendFile(path.resolve(__dirname,'../../testlogs/storelog.txt'), Date.now().toString() + '\n', (err)=> console.log(err));
    //check if  result was succesful
    if(result.status.toString().valueOf() !== '201'){
        return {
            status : result.status,
            message : result.message
        }
    }
    //store update payload in ipfs
    const CID = await storeImageIPFS(req.body.payload,req.file);
    fs.appendFile(path.resolve(__dirname,'../../testlogs/ipfslog.txt'), Date.now().toString() + '\n', (err)=> console.log(err));
    console.log(CID);
    // store CID in the chain
    const resultCID = await callRegisterCIDCC(req, CID);
    fs.appendFile(path.resolve(__dirname,'../../testlogs/cidlog.txt'), Date.now().toString() + '\n', (err)=> console.log(err));
    return {
        status : resultCID.status,
        message : resultCID.message
    }
    
}

module.exports = registerUpdate;