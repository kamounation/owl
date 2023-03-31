/* eslint-disable no-undef */
const httpStatus = require('http-status');
const AppRes = require('../../lib/appRes');

test('app response returns valid data', () => {
  const message = 'test successful';
  const result = new AppRes(httpStatus.OK, message);
  expect(result.isOperational).toBe(true);
  expect(result.message).toEqual(message);
  expect(result.statusCode).toEqual(httpStatus.OK);
});
