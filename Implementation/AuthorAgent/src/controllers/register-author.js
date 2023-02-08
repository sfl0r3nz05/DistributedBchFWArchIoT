const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");
const storeRegisterKey = require('../services/store-register-key');

const registerAuthor = async(req) => {
    // verify input has a correct format. May substitute by mongoose validator.
    let verifiable = verifyKeys(req);
    if(!verifiable){
      return {
        status : 405,
        message : 'Input not valid'
      }
    } 
    const data = await authorRequest(req.body);
    if (data.error){
        return {
            status : 403,
            message : data
          }
    }
    const store = await storeRegisterKey(req.body.publicKey, data.message);
    console.log("response: " + JSON.stringify(store));
    return store;
}

module.exports = registerAuthor;