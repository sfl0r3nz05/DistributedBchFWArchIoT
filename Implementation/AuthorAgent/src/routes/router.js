const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const readRequest = require('../services/verify-register-petition');

router.use(bodyParser.json());
router.post("/register/author", function (req, res) {
    res.json(readRequest(req));
  });


  router.get("/about", function (req, res) {
    return res.redirect('/api-docs');
  });


  router.get("/example", function (req, res) {
    return res.json('Example')
  });
  
  module.exports = router;