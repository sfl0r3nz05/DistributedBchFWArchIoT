const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const verifyUpdate = require("../services/verify-update");

const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'config',  'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', 'wallet');

router.use(bodyParser.json());
router.post("/register/author", async function(req, res) {
    let verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      //CALL CHAINCODE
      try {
        // load the network configuration
        

        // Create a new file system based wallet for managing identities.
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('RegisterAgentUser');
        if (!identity) {
            console.log('An identity for the user "RegisterAgentUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'RegisterAgentUser', discovery: { enabled: true, asLocalhost: false } }); //true gfor localhost

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('register','RegisterAuthor');
        //console.log("message: " + req.body.message + " signedMessage: " + req.body.signedMessage + " publicKey: " + req.body.publicKey);
        // Evaluate the specified transaction.
        contract.evaluateTransaction('createAuthor', req.body.message, req.body.signedMessage, req.body.publicKey).then((result) => {
          gateway.disconnect();
          console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
          res.status(201).json(result.toString());
        }).catch((err) =>{
          gateway.disconnect();
          console.log(`Transaction has been evaluated, obtained following error: ${err.toString()}`);
          res.status(403).json(err.toString());
        });
        

        // Disconnect from the gateway.
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(201).json(error.toString());
    }
  }
  });

  router.post("/register", async function(req, res) {
    let  verifiable = verifyUpdate(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      let manifesto = new Manifest(req.body.manifest);
      let updateRegister = new UpdateRegister({
        authorKey : req.body.authorKey,
        manifest : manifesto,
        authorSign : req.body.authorSign,
        manifestSign : req.body.manifestSign
      })
      //Store update on db
      //CALL CHAINCODE
      res.status(201).json(updateRegister);
    }
    
  });

  router.get("/", function (req, res) {
    return res.redirect('/api-docs');
  });

  router.get("/about", function (req, res) {
    return res.redirect('/api-docs');
  });
  
  module.exports = router;