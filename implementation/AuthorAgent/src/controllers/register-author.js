const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");
const storeRegisterKey = require('../services/store-register-key');

// this controller receives a req containing a RegisterPetition object.
// it makes a POST petition to register Agent and stores the received registerKey in db.
const registerAuthor = async(req) => {
    // verify input has a correct format. May substitute by mongoose validator.
    let verifiable = verifyKeys(req);
    if(!verifiable){
      return {
        status : 405,
        message : 'Input not valid'
      }
    } 
    //POST petition to registerAgent.
    const data = await authorRequest(req.body);
    if (data.error){
        return {
            status : 403,
            message : data
          }
    }
    //store registerKey in db.
    const store = await storeRegisterKey(req.body.publicKey, data.message);
    console.log("response: " + JSON.stringify(store));
    return store;
}

module.exports = registerAuthor;