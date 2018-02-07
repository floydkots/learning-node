const expect = require('expect');

const { generateMessage } = require('./message');

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