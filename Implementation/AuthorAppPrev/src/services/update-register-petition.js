const options = require("../config/config.json");
const axios = require('axios');


//Creates a POST petition to the register agent to store an Update and returns the answer.
async function requestUpdateRegisterMultipart(form) {
    try {
        var res = await axios.post(options.connection, form, {
            headers: form.getHeaders()
         });
         console.log(res);
    } catch (err){
        console.log(err);
    }
     
}

module.exports = requestUpdateRegisterMultipart;