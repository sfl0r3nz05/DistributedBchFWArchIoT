const fs = require('fs');
const path = require('path');
var FormData = require('form-data');
const requestUpdateRegisterMultipart = require('./update-register-petition');
const stringify = require('json-stringify-deterministic');



// This service will create an update petition and send it to the author agent.
var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../','data','update-register.json'),'utf-8'));
var payload = fs.createReadStream(path.resolve(__dirname,'../','data','BCM2046A2-iMac2009Bluetooth.bin'));
var publicKey = fs.readFileSync(path.resolve(__dirname,'../','data','public_key'),'utf-8');

var form = new FormData();
form.append('publicKey', publicKey);
form.append('update', stringify(json.update));
form.append('payload', payload);

requestUpdateRegisterMultipart(form);

