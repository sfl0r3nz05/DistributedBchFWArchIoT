function readRequest(req){
    var keys = Object.keys(req.body);
    console.log (keys);
    return keys;
}

module.exports = readRequest;