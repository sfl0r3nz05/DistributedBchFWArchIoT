const fs = require('fs');
var path = require("path");

const readJSON = (pathTo, versionID) => {
    var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../__tests__/',pathTo), 'utf8'));
    if (versionID){
        json.update.manifest.versionID = versionID;
    }
    return json;
}

module.exports = readJSON;