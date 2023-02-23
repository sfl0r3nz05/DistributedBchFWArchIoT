const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'config',  'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', 'wallet');

//This service creates a connection to the blockchain gateway an asks to create a execute the register
//author contract from RegisterAuthor chaincode.
const callRetrieveUpdateCC = async (req) => {
    //load config files and wallet identities.
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get('RetrievalAgentUser');
    if (!identity) {
        console.log('An identity for the user "RetrievalAgentUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return {
            status : 500,
            message : 'Service not available'
        }
    }
    //connect to the gateway and get contract.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'RetrievalAgentUser', discovery: { enabled: true, asLocalhost: false } });
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('register','RetrieveUpdate');
    try { //ask for the contract to be executed.
        console.log(req.body)
        const result = await contract.submitTransaction('queryVersionByPublicKeyClassID', req.body.publicKey.toString(), req.body.classID.toString());
        gateway.disconnect();
        console.log(`Transaction has been evaluated, result is: ${result}`);
        return {
            status : 201,
            message : result
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

module.exports = callRetrieveUpdateCC;