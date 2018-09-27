const bla = require('./bla');

test('bla adds 1 + 2 to equal 3', () => {
  expect(bla(1, 2).sum()).toBe(3);
});