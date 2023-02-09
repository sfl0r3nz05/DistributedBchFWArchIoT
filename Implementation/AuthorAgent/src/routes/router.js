const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();

const registerAuthor = require('../controllers/register-author');
const registerUpdate = require('../controllers/register-update');

router.use(bodyParser.json());

//Receives a RegisterPetition object. If succesful stores a keyPair with a new register key from 
//the blockchain and the given public key.
router.post("/register/author", async(req, res) => {
  try{
    const response = await registerAuthor(req);
    res.status(parseInt(response.status)).json(response.message);
  }catch(error)  {
    console.log(error);
    if (!error.stat) error.stat = 500;
    res.status(parseInt(error.stat)).json(error.message);
  }
});
    
//Receives an Update and a public key. Tries to register an update in the blockchain.
  router.post("/register", async(req, res) => {
    try {
      const response = await registerUpdate(req);
      res.status(parseInt(response.status)).json(response.message);
    }catch(error){
      console.log(error);
      if (!error.stat) error.stat = 500;
      res.status(parseInt(error.stat)).json(error.message);
    }
  });

  router.get("/", function (req, res) {
    res.redirect('/api-docs');
  });

  router.get("/about", function (req, res) {
    res.redirect('/api-docs');
  });
  
  module.exports = router;