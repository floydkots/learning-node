const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(12)).toBeFalsy();
  });

  it('should reject strings with only spaces', () => {
    expect(isRealString("  ")).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    expect(isRealString(" l o v e")).toBeTruthy();
  });
});
