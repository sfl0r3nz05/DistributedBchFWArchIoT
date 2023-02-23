const fs = require('fs');
var path = require("path");
const digest = require('./digest');
const sign = require('./sign');

const readJSON = (pathTo, versionID, public_key, private_key) => {
    var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../__tests__/',pathTo), 'utf8'));
    json.publicKey = fs.readFileSync('public_key').toString();
    if (versionID){
        json.update.manifest.versionID = versionID;
    }
    if(public_key){
        json.publicKey = fs.readFileSync(public_key).toString();
    }
    json = digest(json);
    if(private_key){
        json = sign(json, fs.readFileSync(private_key));
    }else{
        json = sign(json, fs.readFileSync('private_key'));
    }
    
    return json;
}

module.exports = readJSON;