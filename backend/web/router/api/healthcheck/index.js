'use strict';
const get = require('./get');
const getCheckSingleUser = require('./getCheckSingleUser');
const post = require('./post');
const put = require('./put');
const del = require('./delete');
const registration = require('./registration');
const logIn = require('./logIn');
const getNewsData = require('./getNews');

module.exports = {
  get,
  getCheckSingleUser,
  put,
  post,
  del,
  registration,
  logIn,
  getNewsData
};
