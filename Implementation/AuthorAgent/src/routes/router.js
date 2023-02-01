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
router.post("/register/author", function(req, res) {
    let verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      //should send to register agent
      authorRequest(req.body).then(async(data) => {
        if (data.error){
          res.status(403).json(data.error);
        } else {
          const conn = mongoose.createConnection();
          await mongoose.connect('mongodb://mongo:27017');
          console.log("connected to mongoDB");

          let keypair = new KeyPair({
            publicKey : req.body.publicKey,
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
              res.status(201).json('The Registration was succesful. Register key available in the keyStore');
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




  router.post("/register", async function(req, res) {
    let  verifiable = verifyUpdate(req);
    if(!verifiable){
      res.status(405).json('Input not valid');
    } else {
      //get key from db
      const conn = mongoose.createConnection();
      await mongoose.connect('mongodb://mongo:27017');
      console.log("connected to mongoDB");
      KeyPair.findOne({publicKey : req.body.publicKey}, (err,obj) => {
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
          //TODO: SEND CALL TO REGISTER AGENT, RETURN RESULT
          updateRequest(up).then((data) => {
            if (data.error){
              res.status(403).json(data.error); //CORRECT!!!!!!!!!!!! 403!!!!!
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


  router.get("/example", function (req, res) {
    return res.json('Example')
  });
  
  module.exports = router;