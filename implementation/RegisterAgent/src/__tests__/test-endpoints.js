const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const fs = require('fs');
var path = require("path");

//For correct input testing, please run the test with the same name on author agent, since that
//test makes the full register flow testing, passing through register agent and register chaindode 

  describe.skip('Register Author', () => {
    test('Correct input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/register-petition-ok.json"), 'utf8'));
        request
        .post("/register/author")
        .send(json)
        .expect(403) //must update to 201
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    }, 55000);
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
  }, 55000);

  describe.skip('Register Update', () => {
    test('Correct input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register.json"), 'utf8'));
        request
        .post("/register")
        .send(json)
        .expect(403)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
    test('Correct partial input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register-partial.json"), 'utf8'));
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
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/update-register-wrong.json"), 'utf8'));
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
        request
        .post("/register")
        .send(json)
        .expect(405)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
  });