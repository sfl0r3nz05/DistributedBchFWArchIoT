const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const retrieve = require('../controllers/retrieve');
const retrieveVersion = require('../controllers/retrieve-version');


router.use(bodyParser.json());

//receives a DeviceID and sends it to the CC. Return result (version) from CC.
router.post("/retrieve/version", async function(req, res) {
  try {
    const result = await retrieveVersion(req);
    res.status(parseInt(result.status)).json(result.message);
  }catch (error) {
    console.log(`Failed to evaluate transaction: ${error}`);
    if (!error.status) error.status = 500;
    res.status(parseInt(error.status)).json(error.toString());
  }
});

//receives a DeviceID and sends it to the CC. Return result (full Update) from CC.
router.post("/retrieve", async function(req, res) {
  console.log("start: " + Date.now())
  try {
    const result = await retrieve(req);
    console.log("end: " + Date.now())
    res.status(parseInt(result.status)).json(result.message);
  }catch (error) {
    console.log(`Failed to evaluate transaction: ${error}`);
    if (!error.status) error.status = 500;
    console.log("end fail: " + Date.now())
    res.status(parseInt(error.status)).json(error.toString());
  }
});

router.get("/", function (req, res) {
  return res.redirect('/api-docs');
});

router.get("/about", function (req, res) {
  return res.redirect('/api-docs');
});

module.exports = router;