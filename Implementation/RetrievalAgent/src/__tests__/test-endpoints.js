const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const fs = require('fs');
var path = require("path");


//JSONs in test-json folder may need to be modified, since the key used can be deleted when using network.sh down.
  describe.skip('/retrieve/version', () => {
    test('Correct input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, './test-json/correct.json'), 'utf8'));
        request
        .post("/retrieve/version")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            console.log("RESULT: " + JSON.stringify(res.text));
            return done();
        });
    });
    test('Incorrect input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, './test-json/incorrect.json'), 'utf8'));
        request
        .post("/retrieve/version")
        .send(json)
        .expect(405)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Non existent update', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, './test-json/non-existent.json'), 'utf8'));
        request
        .post("/retrieve/version")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
  });

  describe('/retrieve', () => {
    test('Correct input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, './test-json/correct.json'), 'utf8'));
        request
        .post("/retrieve")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    },20000);
    test.skip('Incorrect input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, './test-json/incorrect.json'), 'utf8'));
        request
        .post("/retrieve")
        .send(json)
        .expect(405)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test.skip('Non existent update', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, './test-json/non-existent.json'), 'utf8'));
        request
        .post("/retrieve/version")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    
  });