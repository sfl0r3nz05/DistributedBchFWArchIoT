const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const fs = require('fs');
var path = require("path");
const crypto = require('crypto');
//const generateKeyFiles = require('../services/generate-key-files');
const mongoose = require('mongoose');

  describe('Register Author', () => {
    test('Correct input', (done)=> {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
                padding: crypto.constants.RSA_PKCS1_PADDING
            },
        });
        //var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/register-petition-ok.json"), 'utf8'));
        fs.writeFileSync('public_key', publicKey);
        fs.writeFileSync('private_key', privateKey.toString('base64'));
        const message = "message";

        const signedMessage = crypto.privateEncrypt({
            key : privateKey, 
            padding : crypto.constants.RSA_PKCS1_PADDING,
        },Buffer.from(message)
        ).toString('base64');

        var json = {
            message: message,
            signedMessage : signedMessage,
            publicKey : publicKey
        };
        
        request
        .post("/register/author")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    }, 30000);
    test('Incorrect input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/register-petition-not-ok.json"), 'utf8'));
        request
        .post("/register/author")
        .send(json)
        .expect(405)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
  });

  describe('Register Update', () => {
    test('Correct input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register.json"), 'utf8'));
        json.publicKey = fs.readFileSync('public_key').toString();
        request
        .post("/register")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Correct partial input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register-partial.json"), 'utf8'));
        json.publicKey = fs.readFileSync('public_key').toString();
        request
        .post("/register")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Incorrect input mandatory field missing', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register-wrong.json"), 'utf8'));
        json.publicKey = fs.readFileSync('public_key');
        request
        .post("/register")
        .send(json)
        .expect(405)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Incorrect input non allowed field', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register-non-allowed.json"), 'utf8'));
        json.publicKey = fs.readFileSync('public_key');
        request
        .post("/register")
        .send(json)
        .expect(405)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Correct input non registered', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register-unregistered.json"), 'utf8'));
        request
        .post("/register")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
  });