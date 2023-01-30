const example = require('../services/example');

describe('Example test process', () => {
  test('Expects Hello world', () => {
    expect(example()).toBe("Hello World");
  });
});