function readRequest(req){
    var keys = Object.keys(req);
    return keys;
}

function verifyPetition(keys, expected){
    return keys.sort().join(',')=== expected.sort().join(',')
}

function verifyManifest(manifestKeys,expectedKeys,mandatoryManifest){
    var listOne = manifestKeys.sort();
    var listTwo = expectedKeys.sort();
    var listThree = mandatoryManifest.sort();
    for (let i = 0; i< manifestKeys.length; i++){
        if (!(listTwo.includes(listOne[i]))){
            console.log(listOne[i] + " field not allowed");
            return false;
        }
    }
    for (let i = 0; i< mandatoryManifest.length; i++){
        if (!(listOne.includes(listThree[i]))){
            console.log(listThree[i] + "mandatory field not present in manifest");
            return false;
        }
    }
    return true;
}

function verifyUpdate(req){
    var keys = readRequest(req.body);
    var expected = ['update', 'publicKey'];
    if(verifyPetition(keys, expected)){
        var updateKeys = readRequest(req.body.update);
        var expectedUpdate = ['manifest', 'payload', 'authorSign', 'authorManifestSign'];
        if (verifyPetition(updateKeys, expectedUpdate)){
            var manifestKeys = readRequest(req.body.update.manifest);
            var mandatoryManifest = 
            ['versionID','monotonicSequenceNumber','classID','payloadFormat',
            'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
             'dependencies', 'encryptionWrapper'];
            var expectedManifest = 
            ['versionID','monotonicSequenceNumber','vendorID','classID','payloadFormat',
            'payloadProcessing', 'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
            'aditionalInstructions', 'dependencies', 'encryptionWrapper', 'payloadIndicator', 
            'payload'];
            return verifyManifest(manifestKeys,expectedManifest,mandatoryManifest);
        } else return false;
    } else return false;
    
}

module.exports = verifyUpdate;

//"multipart/form-data": {