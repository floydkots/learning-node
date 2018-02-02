const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
  let result = utils.add(33, 11);
  expect(result).toBe(44).toBeA('number');
});

it('should square a number', () => {
  let result = utils.square(9);
  expect(result).toBe(81).toBeA('number');
});

it('should expect some values', () => {
  // expect(12).toNotBe(11);
  expect({name: 'Floyd'}).toEqual({name: 'Floyd'});
});

it('should include some values', () => {
  expect([2, 3, 4]).toInclude(2);
  expect([2, 3, 4]).toExclude(5);
});

it('should have some properties', () => {
  expect({
    name: 'Floyd',
    age: 24,
    location: 'Kenya'
  }).toInclude({
    age: 24
  }).toExclude({
    name: 'Peter'
  })
});


it('should verify first and last names are set', () => {
  let user = { location: 'Kenya' };
  let result = utils.setName(user, 'Floyd Kots');
  expect(result).toInclude({firstName: 'Floyd', lastName: 'Kots'});
});