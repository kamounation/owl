/* eslint-disable camelcase */
/* eslint-disable no-undef */
const Dolph = require('../../lib/Dolph');
const { ErrorMsgs } = require('../../lib/messages/errors');

test('test dolphjs application', () => {
  const dolph_one = new Dolph([], 9000, 'development', { options: null, url: null }, []);
  expect(dolph_one.listen()).toReturn();
});
