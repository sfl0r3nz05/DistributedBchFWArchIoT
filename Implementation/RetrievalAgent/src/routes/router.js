const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const retrieveUpdate = require('../controllers/retrieve-update');
const retrievePayload = require('../controllers/retrieve-payload');
const retrieveVersion = require('../controllers/retrieve-version');
const path = require('path');
const fs = require('fs');


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

//receives a DeviceID and sends it to the CC. Return result (Update without payload) from CC.
router.post("/retrieve/update", async function(req, res) {
  fs.appendFile(path.resolve(__dirname,'../../testlogs/startlog.txt'), Date.now().toString() + '\n', (err)=> console.log(err));
  try {
    const result = await retrieveUpdate(req);
    res.status(parseInt(result.status)).json(result.message);
  }catch (error) {
    console.log(`Failed to evaluate transaction: ${error}`);
    if (!error.status) error.status = 500;
    res.status(parseInt(error.status)).json(error.toString());
  }
});

//receives a DeviceID and sends it to the CC. Return result (payload) from IPFS.
router.post("/retrieve/payload", async function(req, res) {
  console.log("start payload: " + Date.now())
  try {
    const result = await retrievePayload(req);
    console.log("end payload: " + Date.now());
    var file = fs.createReadStream(path.resolve(__dirname,'../payload/payload'));
    fs.appendFile(path.resolve(__dirname,'../../testlogs/endlog.txt'), Date.now().toString() + '\n', (err)=> console.log(err));
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=" + result.message
    });
    file.pipe(res);
  }catch (error) {
    console.log(`Failed to evaluate transaction: ${error}`);
    if (!error.status) error.status = 500;
    console.log("end payload fail: " + Date.now())
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