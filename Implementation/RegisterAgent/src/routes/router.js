const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const verifyUpdate = require("../services/verify-update");

const Manifest = require('../models/manifest');
const UpdateRegister = require('../models/updateRegister');

const mongoose = require('mongoose');


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