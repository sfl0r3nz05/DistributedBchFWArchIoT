const mandatoryManifest = 
['versionID','monotonicSequenceNumber','classID','payloadFormat',
'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
    'dependencies', 'encryptionWrapper'];
const expectedManifest = 
['versionID','monotonicSequenceNumber','vendorID','classID','payloadFormat',
'payloadProcessing', 'storageLocation', 'payloadDigest', 'manifestDigest', 'size', 
'aditionalInstructions', 'dependencies', 'encryptionWrapper', 'payloadIndicator', 
'payload'];
const expectedUpdate = ['manifest', 'authorSign', 'authorManifestSign'];
const expected = ['update', 'publicKey'];


function readRequest(req){
    var keys = Object.keys(req);
    return keys;
}

function verifyPetition(keys, expected){
    const verified = keys.sort().join(',')=== expected.sort().join(',');
    if (!verified){
        console.log("Petition Keys not valid. Expected: "+ expected + " Received: " + keys);
    }
    return verified;
}
//this function verifies that the manifest has a correct format.
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

//this function verifies that the req for update register process has all the neccesary keys.
function verifyUpdate(req){
    try {
        var keys = readRequest(req.body);
        var correctKeys = verifyPetition(keys, expected);
        if(!correctKeys){
            return false;
        } 

        var updateKeys;
        try {
            updateKeys = readRequest(JSON.parse(req.body.update));
        } catch (err){
            updateKeys = readRequest(req.body.update);
        }

        var correctBody = verifyPetition(updateKeys, expectedUpdate);
        if(!correctBody){
            return false;
        } 

        var manifestKeys;
        try{
            manifestKeys = readRequest(JSON.parse(req.body.update).manifest);
        } catch {
            manifestKeys = readRequest(req.body.update.manifest);
        }
        return verifyManifest(manifestKeys,expectedManifest,mandatoryManifest);

    } catch(err){
        console.log(err);
        return false;
    }
    
        
    
}

module.exports = verifyUpdate;

//"multipart/form-data": {