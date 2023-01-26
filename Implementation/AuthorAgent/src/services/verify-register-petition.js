function readRequest(req){
    var keys = Object.keys(req.body);
    return keys;
}

function verifyKeys(req){
    var keys = readRequest(req)
    var expected = ['message','signedMessage','publicKey']
    return keys.sort().join(',')=== expected.sort().join(',')
}

module.exports = verifyKeys;