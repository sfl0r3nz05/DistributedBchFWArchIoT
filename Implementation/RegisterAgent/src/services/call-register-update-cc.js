const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'config',  'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', 'wallet');
const stringify = require('json-stringify-deterministic');
const crypto = require('crypto')

//This service creates a connection to the blockchain gateway an asks to create a execute the register
//author contract from RegisterAuthor chaincode.
const callRegisterUpdateCC = async (req) => {
    //load config files and wallet identities.
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get('RegisterAgentUser');
    if (!identity) {
        console.log('An identity for the user "RegisterAgentUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return {
            status : 500,
            message : 'Service not available'
        }
    }
    //connect to the gateway and get contract.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'RegisterAgentUser', discovery: { enabled: true, asLocalhost: false } });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('register','RegisterUpdate');
    try { //ask for the contract to be executed.
        var payload;
        if(req.file){
            payload = fs.readFileSync(req.file.path.toString(),'base64');
        } else {
            payload = req.body.payload;
        }
        const payloadDigest = crypto.createHash('sha384').update(payload).digest('hex');
        console.log(payloadDigest);
        var manifest = req.body.manifest;
        try{
            console.log(JSON.parse(manifest).payloadDigest)
        } catch {
            console.log(manifest.payloadDigest)
        }
        
        //manifest may be in string or object form. We want it to always be in string form.
        if(manifest.versionID){
            manifest = stringify(manifest);
        }
        const result = await contract.submitTransaction('createUpdate', 
        req.body.authorKey, manifest, payload, req.body.authorSign, req.body.authorManifestSign,
        Date.now().toString());
        gateway.disconnect();
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return {
            status : 201,
            message : result.toString()
        }
    }catch (error){
        gateway.disconnect();
        console.log(`Transaction has been evaluated, obtained following error: ${error.toString()}`);
        return {
            status : 403,
            message : error
        }
    }
}

module.exports = callRegisterUpdateCC;