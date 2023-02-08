const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");
const updateRequest = require("../services/update-register-petition");
const verifyUpdate = require("../services/verify-update");

const KeyPair = require('../models/keyPair');
const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

const mongoose = require('mongoose');

router.use(bodyParser.json());

//Receives a RegisterPetition object. If succesful stores a keyPair with a new register key and
//the given public key.
//FOR THE LOVE OF GOD REFACTOR THIS
router.post("/register/author", function(req, res) {
    //Verifies that the input has a correct format.
    let verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      //Request register agent to register the author.
      authorRequest(req.body).then(async(data) => {
        if (data.error){
          res.status(403).json(data);
        } else {
          const conn = mongoose.createConnection();
          await mongoose.connect('mongodb://mongo:27017');
          //console.log("connected to mongoDB");
          //Create keypair object and store it on the database
          let keypair = new KeyPair({
            publicKey : req.body.publicKey.toString('base64'),
            registerKey : data.message
          });
          var keyObject = keypair.toObject();
          delete keyObject._id;
          KeyPair.findOneAndUpdate({'publicKey': keypair.publicKey}, keyObject, {upsert: true}, (err) => {
            if(err){
              console.log(err);
              conn.close();
              res.status(500).json(err);
            } else {
              console.log("saved: " + keypair);
              conn.close();
              res.status(201).json('The Registration was succesful. Register key available in the keyStore: '+ keypair.registerKey + " DO NOT MISS THIS KEY. It is MANDATORY for registering updates for the given public key");
            }
          });
      }
        
    }).catch(function (error) {
      console.log(error);
      if (!error.stat) error.stat = 500;
      res.status(parseInt(error.stat)).json(error.message);
    });
    }
    
  });



//Receives an Update and a public key
//FOR THE LOVE OF GOD REFACTOR THIS
  router.post("/register", async function(req, res) {
    //verifies that input has correct format.
    let  verifiable = verifyUpdate(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      //get register key from db
      const conn = mongoose.createConnection();
      await mongoose.connect('mongodb://mongo:27017');
      console.log(req.body.publicKey);
      KeyPair.findOne({publicKey : req.body.publicKey.toString()}, (err,obj) => {
        if (err) {
          console.log(err);
          conn.close();
          res.status(500).json('INTERNAL SERVER ERROR : DB NOT AVAILABLE');
        } else if(!obj){
          conn.close();
          res.status(403).json('ERR_KEY_NOT_VALID');
        } else {
          console.log(obj);
          conn.close();
          // create updateRegister
          let manifesto = new Manifest(req.body.update.manifest);
          if (!manifesto.monotonicSequenceNumber || manifesto.monotonicSequenceNumber === ""){
            var date = new Date();
            manifesto.monotonicSequenceNumber = date;
          }
          let updateRegister = new UpdateRegister({
            authorKey : obj.registerKey,
            manifest : manifesto,
            authorSign : req.body.update.authorSign,
            authorManifestSign : req.body.update.authorManifestSign,
            payload : req.body.update.payload
          });
          var up = updateRegister.toObject();
          delete up._id;
          delete up.manifest._id;
          console.log(up);
          //SEND CALL TO REGISTER AGENT, RETURN RESULT
          updateRequest(up).then((data) => {
            if (data.error){
              res.status(403).json(data); 
            } else {
              res.status(data.stat).json(data.message);
            }
          }).catch(function (error) {
            console.log(error);
            if (!error.stat) error.stat = 500;
            res.status(parseInt(error.stat)).json(error.message);
          });
          
        }
      });
    }
    
  });

  router.get("/", function (req, res) {
    return res.redirect('/api-docs');
  });

  router.get("/about", function (req, res) {
    return res.redirect('/api-docs');
  });
  
  module.exports = router;