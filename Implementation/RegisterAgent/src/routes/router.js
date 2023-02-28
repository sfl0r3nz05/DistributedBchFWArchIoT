const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const registerAuthor = require('../controllers/register-author');
const registerUpdate = require('../controllers/register-update');
const multer = require('multer');
const path = require('path');


// SET STORAGE

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.bin')
  }
})

var upload = multer({ storage: storage })



//receives a RegisterPetition and POSTs it to the CC. Return result from CC.
router.post("/register/author",bodyParser.json(), async function(req, res) {
      try {
        const result = await registerAuthor(req);
        res.status(parseInt(result.status)).json(result.message.toString());
      }catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`);
        if (!error.status) error.status = 500;
        res.status(parseInt(error.status)).json(error.toString());
      }
  });

//Receives an UpdateRegister and sends it to CC. If successful, store the payload in IPFS and aks CC
//to update the CID. Returns result from CC.
router.post("/register", bodyParser.json(), upload.single('payload'), async function(req, res, next) {
  try {
    console.log("ya right")
    console.log(req.body, req.file);
    const result = await registerUpdate(req);
    res.status(parseInt(result.status)).json(result.message.toString());
  }catch (error) {
    console.log(`Failed to evaluate transaction: ${error}`);
    if (!error.status) error.status = 500;
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