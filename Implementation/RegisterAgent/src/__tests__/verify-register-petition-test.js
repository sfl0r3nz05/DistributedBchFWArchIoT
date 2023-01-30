const verifyKeys = require ('../services/verify-register-petition');

describe('Verify key verification', () => {
    test('Correct RegisterPetition', () => {
      expect(verifyKeys({body:{message:"string", signedMessage:"string", publicKey:"string"}})).toBe(true);
    });
    test('inCorrect RegisterPetition', () => {
        expect(verifyKeys({body:{messagero:"string", signadoMessage:"string", publicoKey:"string"}})).toBe(false);
      });
  });