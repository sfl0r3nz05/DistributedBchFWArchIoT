var mongoose = require('mongoose');

const ConnectDB = async() => {
    console.log("starting mongose: "+ Date.now()) ;
     mongoose
	.connect(
	'mongodb://mongo:27017/keyStore', () => {
        console.log ("CONNECTED TO MONGO: " + Date.now());
    });
    };

module.exports = ConnectDB;