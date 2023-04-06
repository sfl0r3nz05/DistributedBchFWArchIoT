
//This function verifies that the req has the neccesary keys for author register process.
function verifyKeys(req){
    var keys = Object.keys(req.body);
    var expected = ['message','signedMessage','publicKey']
    return keys.sort().join(',')=== expected.sort().join(',')
}

module.exports = verifyKeys;