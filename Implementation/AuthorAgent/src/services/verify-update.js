function readRequest(req){
    var keys = Object.keys(req.body);
    return keys;
}

function verifyPetition(keys, expected){
    return keys.sort().join(',')=== expected.sort().join(',')
}

function verifyManifest(manifestKeys,expectedKeys){
    var listOne = manifestKeys.keys().sort();
    var listTwo = expectedKeys.keys().sort();
    for (let i = 0; i< expectedKeys.length; i++){
        if (!(listOne[i] in listTwo)){
            return false;
        }
    }
    return true;
}

function verifyUpdate(req){
    console.log(req.body);
    var keys = readRequest(req);
    console.log("Keys: " + keys );
    var expected = ['update', 'publicKey'];
    if(verifyPetition(keys, expected)){
        var updateKeys = readRequest(req.update);
        console.log("Update Keys: " + updateKeys );
        var expectedUpdate = ['manifest', 'payload', 'authorSign', 'authorManifestSign'];
        if (verifyPetition(updateKeys, expectedUpdate)){
            var manifestKeys = readRequest(req.update.manifest);
            console.log("manifestKeys: " + manifestKeys );
            var expectedManifest = 
            ['versionID','monotonicSequenceNumber','vendorID','classID','payloadFormat',
            'payloadProcessing', 'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
            'aditionalInstructions', 'dependencies', 'encryptionWrapper', 'payloadIndicator', 
            'payload'];
            return verifyManifest(manifestKeys,expectedManifest);
        } else return false;
    } else return false;
    
}

module.exports = verifyUpdate;