const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const verifyUpdate = require("../services/verify-update");

const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

const grpc = require ('@grpc/grpc-js');
const {connect, signers} = require ('@hyperledger/fabric-gateway');
const crypto = require('crypto');
const fs =  require('fs/promises');
const path = require('path');

const cryptoPath = path.resolve(__dirname, '..', '..', '..', 'Hyperledger','fabric-samples','test-network', 'organizations', 'peerOrganizations', 'org1.example.com');

// Path to user private key directory.
const keyDirectoryPath =  path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore');

// Path to user certificate.
const certPath = path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'signcerts', 'cert.pem');

// Path to peer tls certificate.
const tlsCertPath =  path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt');

// Gateway peer endpoint.
const peerEndpoint = 'localhost:7051';

// Gateway peer SSL host name override.
const peerHostAlias =  'peer0.org1.example.com';

async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': 'peer0.org1.example.com',
    });
}

const client = async(conn) => {
  conn =  await newGrpcConnection();
  return conn;
};

const gateway = async() => { 
    return connect({
    client,
    identity: await newIdentity(),
    signer: await newSigner(),
});};

async function newIdentity(){
    const credentials = await fs.readFile(certPath);
    return { mspId: 'Org1MSP', credentials };
}

async function newSigner(){
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

const network = gateway().getNetwork('myChannel');
const contract = network.getContract('register');

router.use(bodyParser.json());
router.post("/register/author", async function(req, res) {
    let verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      //CALL CHAINCODE
      res.status(201).json('EXAMPLE: UGFuGfg2r8739f93fu329qftggqbvcugpfg37');
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
      const resultBytes = await contract.evaluateTransaction('GetAllAssets');

      const resultJson = utf8Decoder.decode(resultBytes);
      const result = JSON.parse(resultJson);
      console.log('*** Result:', result);
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