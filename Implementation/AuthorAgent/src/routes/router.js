const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const registerAuthor = require('../controllers/register-author');
const registerUpdate = require('../controllers/register-update');

//router.use(bodyParser.json());

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

//Receives a RegisterPetition object. If succesful stores a keyPair with a new register key from 
//the blockchain and the given public key.
router.post("/register/author", bodyParser.json(), async(req, res) => {
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
  //JSON
  router.post("/register", bodyParser.json(),upload.single('payload'), async(req, res, next) => {
    console.log(req.file)
    try {
      const response = await registerUpdate(req);
      console.log(response);
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