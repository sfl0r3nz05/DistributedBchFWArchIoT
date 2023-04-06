const verifyKeys = require ('../services/verify-register-petition');

describe('Test input field/key verification', () => {
    test('Correct RegisterPetition', () => {
      expect(verifyKeys({body:{message:"string", signedMessage:"string", publicKey:"string"}}))
      .toBe(true);
    });
    test('Correct RegisterPetition different input order', () => {
      expect(verifyKeys({body:{signedMessage:"string", publicKey:"string", message:"string"}}))
      .toBe(true);
    });
    test('inCorrect RegisterPetition keys', () => {
        expect(verifyKeys({body:{messagero:"string", signadoMessage:"string", publicoKey:"string"}}))
        .toBe(false);
      });
    test('inCorrect RegisterPetition object type, CORRECT keys', () => {
      expect(verifyKeys({body:{message: 3, signedMessage: Buffer.from("string"), publicKey:["string"]}}))
      .toBe(true);
    });
    test('inCorrect RegisterPetition format', () => {
      expect(() => {
        verifyKeys(3, Buffer.from("string"), ["string"]);
      }).toThrow();
    });
  });