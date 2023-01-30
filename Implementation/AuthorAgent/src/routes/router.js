const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const readRequest = require('../services/verify-register-petition');
const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");

router.use(bodyParser.json());
router.post("/register/author", async function(req, res) {
    let = verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(400).json('Input not valid');
    } else {
      //should send to register agent
      console.log("authorRequested");
      authorRequest(req.body).then((data) => {
        res.status(201).json(data);
    }).catch(function (error) {
      res.status(parseInt(error.stat)).json(error.message);
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