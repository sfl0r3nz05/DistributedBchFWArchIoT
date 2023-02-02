const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const fs = require('fs');
var path = require("path");
const mongoose = require('mongoose');

  describe('Register Author', () => {
    test('Correct input', (done)=> {
        var json = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./test-json/register-petition-ok.json"), 'utf8'));
        request
        .post("/register/author")
        .send(json)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
        done();
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