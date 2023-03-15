const axios = require ('axios');
const fs = require('fs');
const stringify = require('json-stringify-deterministic');
const path =  require('path');
const FormData = require('form-data');

async function registerUpdateFile(json, num, filePath){
    const url = 'http://127.0.0.1:3000/register';
    var formData = new FormData();
    formData.append('publicKey', json.publicKey);
    formData.append('update', stringify(json.update));
    formData.append('payload', fs.createReadStream(path.resolve(__dirname,filePath)));
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
        })
        //console.log(res.data)
        json.update.authorSign = res.data.sign;
        json.update.manifest.payloadDigest = res.data.digest;
    } catch(err){
        console.log(err.message)
    }
}


const test = async (times,filePath) =>{
    console.log("Beginning tests")
    var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./update-register.json')).toString());
    var publicKey = fs.readFileSync(path.resolve(__dirname,'./public_key')).toString();
    var privateKey = fs.readFileSync(path.resolve(__dirname,'./private_key')).toString();
    var payload = fs.createReadStream(path.resolve(__dirname,filePath))
    await signPayloadFile(privateKey,payload,json)
    
    json.publicKey = publicKey;

    
    for(var i = 0; i < times; i++){
        var jsonit = JSON.parse(stringify(json));
        jsonit.update.manifest.versionID = 'Test361'+i;
        //delete jsonit.payload;
        await signManifestJson(jsonit, privateKey);
        //console.log(jsonit.update)
        await registerUpdateFile(jsonit,i,filePath);
    }
    
}
var test552 = './BCM2046A2-iMac2009Bluetooth.bin';
var test95 = './9.5MBTest.bin'
var test154 = './15.4MBTest.bin'
var test361 = './36.1MBTest.bin'
test(100,test361);