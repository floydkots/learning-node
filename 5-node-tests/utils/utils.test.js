const utils = require('./utils');

it('should add two numbers', () => {
  let result = utils.add(33, 11);
  if (result !== 44) {
    throw new Error(`Expected 44, but got ${result}`)
  }
});

it('should square a number', () => {
  let result = utils.square(9);
  if (result !== 81) {
    throw new Error(`Expected 81, but got ${result}`);
  }
});