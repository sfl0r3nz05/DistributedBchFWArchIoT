const fs = require('fs');
var path = require("path");
const digest = require('./digest');
const sign = require('./sign');

const readJSON = (pathTo, versionID) => {
    var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../__tests__/',pathTo), 'utf8'));
    json.publicKey = fs.readFileSync('public_key').toString();
    if (versionID){
        json.update.manifest.versionID = versionID;
    }
    json = digest(json);
    json = sign(json, fs.readFileSync('private_key'));
    return json;
}

module.exports = readJSON;