const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const verifyKeys = require("../services/verify-register-petition");
const authorRequest = require("../services/author-register-petition");

router.use(bodyParser.json());
router.post("/register/author", async function(req, res) {
    let = verifiable = verifyKeys(req);
    if(!verifiable){
      res.status(400).json('Input not valid');
    } else {
      res.status(201).json('EXAMPLE: UGFuGfg2r8739f93fu329qftggqbvcugpfg37');
    }
    
  });

  router.get("/", function (req, res) {
    return res.redirect('/api-docs');
  });

  router.get("/about", function (req, res) {
    return res.redirect('/api-docs');
  });
  
  module.exports = router;