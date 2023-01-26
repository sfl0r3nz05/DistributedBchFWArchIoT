const verifySign = require('../services/verify-author-sign.js');
const generateKeyFiles = require('../services/generate-key-files');

var crypto = require('crypto');
var fs = require('fs');
const path = require('path');

describe('Verify sign content decryption', () => {
  test('Correct case', () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
    })

    const message = "my secret data"

    const signedMessage = crypto.privateEncrypt(
        privateKey,
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(message)
    )
    expect(verifySign(message, signedMessage, publicKey)).toBe(true);
  });

  test('inCorrect case', () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
    })

    const message = "my secret data"

    const signedMessage = crypto.privateEncrypt(
        privateKey,
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(message)
    )
    expect(verifySign(message, signedMessage, publicKey)).toBe(true);
  });
});