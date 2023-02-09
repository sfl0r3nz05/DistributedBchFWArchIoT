const updateRequest = require("../services/update-register-petition");
const verifyUpdate = require("../services/verify-update");
const retrieveRegisterKey = require('../services/retrieve-register-key');
const createUpdateRegister = require('../services/create-update-register');

//This controller receives a req from router, which must contain an Update object and a publicKey in req.body.
//It returns an object containing a status code and a message, either error or success.
//It manages all the services require to adapt the Update petition and POST it to the register agent.
const registerUpdate = async(req) => {
        // req is verified to contain all the fields needed for the update process.
        let verifiable = verifyUpdate(req);
        if(!verifiable){
            return {
                status : 405,
                message : 'Input not valid'
            }
        }
        //registerKey associated to publicKey is retrived from db. 
        const registerKey = await retrieveRegisterKey(req.body.publicKey);
        if (!registerKey){
            return {
                status : 403,
                message : 'ERR_KEY_NOT_VALID'
            }
        }
        //An UpdateRegister object is made from Update and registerKey.
        const updateRegister = createUpdateRegister(req, registerKey);
        // POST petition made to registerAgent
        const data = await updateRequest(updateRegister);
        return {
            status : data.stat,
            message : data.message
        }
}

module.exports = registerUpdate;