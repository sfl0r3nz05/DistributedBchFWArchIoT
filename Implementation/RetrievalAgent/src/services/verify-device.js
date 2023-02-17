function readRequest(req){
    var keys = Object.keys(req.body);
    return keys;
}

//this function verifies that the RegisterPetition has the correct keys.
function verifyKeys(req){
    var keys = readRequest(req)
    var expected = ['classID','publicKey']
    return keys.sort().join(',')=== expected.sort().join(',')
}

module.exports = verifyKeys;