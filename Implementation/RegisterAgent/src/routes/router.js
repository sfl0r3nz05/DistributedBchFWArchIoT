const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const registerAuthor = require('../controllers/register-author');
const registerUpdate = require('../controllers/register-update');

router.use(bodyParser.json());

//receives a RegisterPetition and POSTs it to the CC. Return result from CC.
router.post("/register/author", async function(req, res) {
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
router.post("/register", async function(req, res) {
  try {
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