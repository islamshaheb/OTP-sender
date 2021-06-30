/** @format */

require('dotenv').config({ path: '../.env' });
const env = process.env.ENV || 'local';
const appPort = process.env.PORT;
const host = process.env.HOST;
const service = process.env.SERVICE;
const userName = process.env.EMAIL;
const password = process.env.PASS;
const mailHost = process.env.MAIL_HOST;
// Scafolding
const allvariable = {};

allvariable.variables = {
  appPort,
  env,
  host,
};
allvariable.authInformation = {
  service,
  userName,
  password,
  mailHost,
};
module.exports = allvariable;
