const axios = require('axios');
const fs = require('fs');
const path = require('path')

async function retrieveUpdate(json){
    retrieveManifest(json);
    //await retrievePayload(json);
}

async function retrieveManifest(json){
    const url = 'http://127.0.0.1:3002/retrieve/update';
    console.log(json);
    try{
        const res = await axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            }
        })
        //console.log(res.data)
    } catch (err){
        console.log(err.message)
    }
    
}

async function retrievePayload(json){
    const url = 'http://127.0.0.1:3002/retrieve/payload';
    console.log(json);
    try {
        const res = await axios.post(url, json, {
            withCredentials : false,
            headers : {
                "Content-Type" : "application/json"
            },
            
        })
        //console.log(res.data)
    } catch (err){
        console.log(err.message)
    }
}

const test = async() =>{
    var key = fs.readFileSync(path.resolve(__dirname,'./public_key')).toString()
    var json = {
        publicKey : key,
        classID : 'Class_1'
    }

    await retrieveUpdate(json)
}
test();