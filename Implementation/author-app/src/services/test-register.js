const axios = require ('axios');
const fs = require('fs');
const stringify = require('json-stringify-deterministic');
const path =  require('path');
const FormData = require('form-data');

async function registerUpdateFile(json, num){
    const url = 'http://127.0.0.1:3000/register';
    var formData = new FormData();
    formData.append('publicKey', json.publicKey);
    formData.append('update', stringify(json.update));
    formData.append('payload', fs.createReadStream(path.resolve(__dirname,'./BCM2046A2-iMac2009Bluetooth.bin')));
    //console.log(formData);
    try {
        const res = await axios.post(url, formData, {
            withCredentials : false,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        console.log("excution " + num +": " + res.data)
    } catch (err){
        console.log(err.message)
    }
}

async function signManifestJson(json, privateKey){
    const url = 'http://127.0.0.1:3000/sign';
    const jsonSend = {
        privateKey : privateKey,
        message : json.update.manifest,
    }
    //console.log(json);
    try {
        const res = await axios.post(url, jsonSend, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        })
        //console.log(res.data);
        json.update.authorManifestSign = res.data.sign;
        json.update.manifest.manifestDigest = res.data.digest;
    }catch (err){
        console.log(err.message)
    }
    
}

async function signPayloadFile(privateKey, payload, json){
    const url = 'http://127.0.0.1:3000/sign';
    var formData = new FormData();
    formData.append('privateKey', privateKey);
    formData.append('payload', payload);
    //console.log(formData);
    try {
        const res = await axios.post(url, formData, {
            withCredentials : false,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        });
        //console.log(res.data)
        json.update.authorSign = res.data.sign;
        json.update.manifest.payloadDigest = res.data.digest;
    } catch(err){
        console.log(err.message)
    }
}


const test = async () =>{
    var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./update-register.json')).toString());
    var publicKey = fs.readFileSync(path.resolve(__dirname,'./public_key')).toString();
    var privateKey = fs.readFileSync(path.resolve(__dirname,'./private_key')).toString();
    var payload = fs.readFileSync(path.resolve(__dirname,'./BCM2046A2-iMac2009Bluetooth.bin'),'base64');
    await signPayloadFile(privateKey,payload,json)
    
    json.publicKey = publicKey;

    
    for(var i = 0; i < 100; i++){
        var jsonit = JSON.parse(stringify(json));
        json.update.manifest.versionID = 'V_100'+i;
        //delete jsonit.payload;
        await signManifestJson(jsonit, privateKey);
        //console.log(jsonit.update)
        await registerUpdateFile(jsonit,i);
    }
    
}

test()