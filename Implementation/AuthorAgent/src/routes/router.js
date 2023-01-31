const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");
const verifyUpdate = require("../services/verify-update");

router.use(bodyParser.json());
router.post("/register/author", async function(req, res) {
    let verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(400).json('Input not valid');
    } else {
      //should send to register agent
      authorRequest(req.body).then((data) => {
        res.status(201).json(data);
    }).catch(function (error) {
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