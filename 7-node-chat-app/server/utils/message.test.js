const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = '@Test';
    const text = 'Testing';
    const result = generateMessage(from, text);
    expect(result).toHaveProperty('from', from);
    expect(result).toHaveProperty('text', text);
    expect(typeof result.createdAt).toBe('number');
  });
});


describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const from = '@Test';
    const lat = 1;
    const long = 1;
    const result = generateLocationMessage(from, lat, long);
    expect(result).toHaveProperty('from', from);
    expect(result).toHaveProperty('url', 'https://www.google.com/maps?q=1,1');
    expect(typeof result.createdAt).toBe('number');
  });
});
