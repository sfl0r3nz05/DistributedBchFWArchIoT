const expected = ['authorKey','manifest','authorSign','authorManifestSign'];
const expectedPayload = ['authorKey','manifest','authorSign','authorManifestSign','payload'];
const mandatoryManifest = 
['versionID','monotonicSequenceNumber','classID','payloadFormat',
'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
    'dependencies', 'encryptionWrapper'];
const expectedManifest = 
['versionID','monotonicSequenceNumber','vendorID','classID','payloadFormat',
'payloadProcessing', 'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
'aditionalInstructions', 'dependencies', 'encryptionWrapper', 'payloadIndicator', 
'payload'];

function readRequest(req){
    var keys = Object.keys(req);
    return keys;
}

function verifyPetition(keys, expected){
    return keys.sort().join(',')=== expected.sort().join(',')
}
//this function verifies that the received manifest has a correct format.
function verifyManifest(manifestKeys,expectedKeys,mandatoryManifest){
    console.log(manifestKeys)
    var listOne = manifestKeys.sort();
    var listTwo = expectedKeys.sort();
    var listThree = mandatoryManifest.sort();
    for (let i = 0; i< manifestKeys.length; i++){
        if (!(listTwo.includes(listOne[i]))){
            console.log(listOne[i] + " field not allowed");
            throw new Error('ERR_INCORRECT_MANIFEST_FORMAT');
        }
    }
    for (let i = 0; i< mandatoryManifest.length; i++){
        if (!(listOne.includes(listThree[i]))){
            console.log(listThree[i] + "mandatory field not present in manifest");
            throw new Error('ERR_INCORRECT_MANIFEST_FORMAT');
        }
    }
    return true;
}


// this function verifies that the received UpdateREgister has the correct format.
function verifyUpdate(req){
    var update;
    try{
        update = JSON.parse(req.body);
    } catch {
        update = req.body;
    }
    var keys = readRequest(update);
    
    if(verifyPetition(keys, expected) || verifyPetition(keys, expectedPayload)){
        var manifestKeys;
        try {
            manifestKeys = readRequest(JSON.parse(update.manifest));
        } catch {
            manifestKeys = readRequest(update.manifest);
        }
       
        return verifyManifest(manifestKeys,expectedManifest,mandatoryManifest);
    } else return false;
}

module.exports = verifyUpdate;

//"multipart/form-data": {