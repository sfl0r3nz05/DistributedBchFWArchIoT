'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const retrieveImageIPFS = require('./retrieve-image-ipfs');

const ccpPath = path.resolve(__dirname, '..', 'config',  'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', 'wallet');

//This is used to perform queries to test the network manually and is not called by the agent.

async function main() {
    try {
        // load the network configuration
        

        // Create a new file system based wallet for managing identities.
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('RegisterAgentUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'RegisterAgentUser', discovery: 
        { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('register', 'RegisterUpdate');

        const result = await contract.evaluateTransaction('queryUpdateByPublicKeyVersionIDClassID', 
        '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA4oB6Ep5oZvwjreBlswmykb2zWLXnAHEEmrdcZfVYAaFODm9KjCCE\np1KhSeujSrAQyPDAxu8U5oBsa07UyccY4NRuruSpuym+zD8PJeJuaUSiW92soplw\nQWcO12096K5A/nxezHFGE2Cdb7sPD5lYE2yLmHCFkxVDbQqnAgwzWZ3jNX25X4ph\nf3JP66jNPLZ6R+9+ccA8Buw5PyHbz1MP6t37IO6U5TuVjBDPP7T62lGoSqU2BXWS\nGhaNlHSkYMIT2uwm9rQOiRvDWJInD8/D2t/x0XMMM39uikzz+OKq1J9P7W94WqI3\nzw9/QDzvvjucdC2Vp6HQyPrdwBELp37yGwIDAQAB\n-----END RSA PUBLIC KEY-----\n'
        ,'string' , 'string' );//'updateCID' ,'eyJhbGciOiJIUzI1NiJ9.LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQXE1aXY0c1EzQzRTZ05jZWhmK2Q3L0MwLzhUMUNERnRpUkY4VE9aamF6WXFrbEhtUVRTSVcKVWt0MTFIVDZWSmEvdGVOcFJJZE1sSlU2aGRlUjNHY3FiTmYvV01wcUlMb2tLcXp2NVY2ai8wU09OWWkrU3I5Vgo3bVgzd0lvV3BrNjBNZm9tYTNGMnplMU93U2R4RXpJTjN1SFpsUDIrMWtPM01kbnh6cDRKWFBSN1ltR1BXN2hXCjBTMlY0TlhiWGxCbTJ2V0c2WVV1Y0xTZ0J1ZVM2emhGSDNyRncrcmdrUVU1UWRDb01PaEZWMGJseEJrdTBlYWoKMXdtN3FNOGNMUzI1UnJqVHN5ejVHa3kyZGVXZkUvSjJnNmVYY1pCOStxZUxYY1hPRzlINDdwMEVqNzVEMWdwVgo2c216TEY4ZVdDSkRzaW1jcGtnRVVMWTVxa2RFTzFsejh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K._HGVOymhHD1jR5EwJz6dtflJjz3fOafUzyonGukig_g','string','string', 'Updateame esta CID Crack ;D');
        console.log('Transaction has been evaluated, result is: ' + JSON.stringify(JSON.parse(result),
        null,'\t'));
        // Disconnect from the gateway.
        gateway.disconnect();
        const meh = JSON.parse(result).Record.CID.path;
        console.log(meh)
        const res = await retrieveImageIPFS(meh);
        console.log(res.toString());
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();