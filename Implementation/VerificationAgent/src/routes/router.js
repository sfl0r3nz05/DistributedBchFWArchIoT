const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const verify = require('../controllers/verify');


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

//receives an update and a device ID and verifies the update. Returns true or error.
router.post("/verify", bodyParser.json(),upload.single('payload'), async(req, res) => {
    
  try {
    console.log("reached here")
    const response = await verify(req);
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