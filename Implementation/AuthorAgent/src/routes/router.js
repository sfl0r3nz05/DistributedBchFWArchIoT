const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");
const verifyUpdate = require("../services/verify-update");

const KeyPair = require('../models/keyPair');

const mongoose = require('mongoose');

router.use(bodyParser.json());
router.post("/register/author", function(req, res) {
    let verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(400).json('Input not valid');
    } else {
      //should send to register agent
      authorRequest(req.body).then(async(data) => {
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
          res.status(201).json(keypair.publicKey);
        }
      });
        
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
      res.status(201).json('prueba es bien');
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