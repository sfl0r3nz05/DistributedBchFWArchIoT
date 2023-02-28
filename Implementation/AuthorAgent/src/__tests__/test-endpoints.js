const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const fs = require('fs');
var path = require("path");
const crypto = require('crypto');
const readJSON = require('../services/test-services/read-json');


  describe.skip('/register/author', () => {
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
        console.log(publicKey.toString('base64'));
        const message = "message";
        const messageHash = crypto.createHash('sha384').update(message).digest('hex');
        const signedMessage = crypto.privateEncrypt({
            key : privateKey, 
            padding : crypto.constants.RSA_PKCS1_PADDING,
        },Buffer.from(messageHash)
        ).toString('base64');

        var json = {
            message: message,
            signedMessage : signedMessage,
            publicKey : publicKey
        };
        //console.log("JSON when good: " + JSON.stringify(json))
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

  describe.skip('/register', () => {
    test('Correct input', (done)=> {
        var json = readJSON("./test-json/update-register.json",'V_1');
        request
        .post("/register")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    },20000);
    test('Correct partial input', (done)=> {
        var json = readJSON("./test-json/update-register-partial.json", 'V_2');
        request
        .post("/register")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Correct partial input repeated key', (done)=> {
        var json = readJSON("./test-json/update-register-partial.json",'V_1');
        request
        .post("/register")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Incorrect input mandatory field missing', (done)=> {
        var json = readJSON("./test-json/update-register-wrong.json");
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
        var json = readJSON("./test-json/update-register-non-allowed.json");
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
        var json = readJSON("./test-json/update-register-unregistered.json");
        json.publicKey = 'NONREGISTEREDKEY'
        request
        .post("/register")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Modified manifest', (done)=> {
        var json = readJSON("./test-json/update-register.json");
        json.update.manifest.versionID = "XD"
        request
        .post("/register")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Modified payload', (done)=> {
        var json = readJSON("./test-json/update-register.json");
        json.update.payload = "XD"
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

    describe.skip('Register Author and Update with Non random Key, For retrieval Testing', () => {
        test('Correct input', (done)=> {
            const publicKey = fs.readFileSync(path.resolve(__dirname,'../','public_key'),'utf8');
            const privateKey = fs.readFileSync(path.resolve(__dirname,'../','private_key'),'utf8');

            const message = "message";
    
            const messageHash = crypto.createHash('sha384').update(message).digest('hex');
            const signedMessage = crypto.privateEncrypt({
                key : privateKey, 
                padding : crypto.constants.RSA_PKCS1_PADDING,
            },Buffer.from(messageHash)
            ).toString('base64');
            
            const decrypt = crypto.publicDecrypt(publicKey,Buffer.from(signedMessage, 'base64')).toString();
            console.log("Decrypt: " + decrypt + " hash: " + messageHash);
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
        },20000);
        test('Correct input non random', (done)=> {
            var json = readJSON("./test-json/update-register-non-random.json",'V_2',path.resolve(__dirname,'../','public_key'),path.resolve(__dirname,'../','private_key'),false);
            console.log("public key: " + json.publicKey);
            request
            .post("/register")
            .send(json)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
        },20000);
  });