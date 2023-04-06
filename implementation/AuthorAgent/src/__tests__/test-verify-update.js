const readJSON = require('../services/test-services/read-json');
const verifyUpdate = require ('../services/verify-update');

describe('Test input update verification', () => {
    test('Correct RegisterPetition', () => {
      var json = {body: readJSON('./test-json/update-register.json')};
      expect(verifyUpdate(json))
      .toBe(true);
    });
    test('Correct partial RegisterPetition', () => {
      var json = {body: readJSON('./test-json/update-register-partial.json')};
      expect(verifyUpdate(json))
      .toBe(true);
    });
    test('INCorrect  non allowed RegisterPetition', () => {
      var json = {body: readJSON('./test-json/update-register-non-allowed.json')};
      expect(verifyUpdate(json))
      .toBe(false);
    });
    test('INCorrect  non allowed RegisterPetition', () => {
      var json = {body: readJSON('./test-json/update-register-wrong.json')};
      expect(verifyUpdate(json))
      .toBe(false);
    });
    
    //test('inCorrect RegisterPetition format', () => {
    //  expect(() => {
    //    verifyUpdate('json',3);
     // }).toThrow();
    //});
  });