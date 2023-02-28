const options = require("../config/config.json");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const stringify = require('json-stringify-deterministic');

const multipart = async (pdata, filePath,url) =>{
    console.log(pdata)
    form = new FormData();
    var payload = fs.createReadStream(filePath);
    console.log(payload);
    form.append('payload', payload);
    form.append('authorKey', pdata.authorKey.toString());
    form.append('manifest', stringify(pdata.manifest));
    form.append('authorSign', pdata.authorSign.toString());
    form.append('authorManifestSign', pdata.authorKey.toString());
    var res = await axios.post(url, form, {
        headers: form.getHeaders(),
        validateStatus : () => true
        });
    console.log("obtained res: " + res.data)
    console.log(Date.now())
    return res;
}

const jsonType = async (pdata,url) =>{
    var res = await axios.post(url, pdata, {
        validateStatus : () => true
    });
    console.log("obtained res: " + res.data)
    return res;
}
//Creates a POST petition to the register agent to store an Update and returns the answer.
async function requestUpdateRegister(pdata, isMultipart, filePath) {
    try {
        const url = 'http://'+options.requestHost+':'+options.requestPort+options.registerUpdatePath;
        var res;
        if(isMultipart){
            res = await multipart(pdata,filePath,url);
        } else {
            res = await jsonType(pdata,url);
        }
        return {
            stat : res.status,
            message : res.data
            };
    } catch (err){
        console.log(err.data)
        try {
            return {
                stat : err.response.status,
                message : err.response.data
             };
        } catch (err2){
            return {
                stat : 500,
                message : err,err2
             };
        }
        
    }
}

module.exports = requestUpdateRegister;