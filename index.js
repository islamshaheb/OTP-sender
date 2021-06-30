/** @format */
// avoid hoisting
'use strict';

// Dependences
require('dotenv').config();
const Koa = require('koa');
const jsn = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyParser');
const path = require('path');
const cors = require('koa2-cors');

// From other file
const { variables } = require('./variables/index');
const router = require('./routes');

// koa object
const app = new Koa();

// Middleware for JSON Prettier
app.use(jsn());

// Bodyparser Middleware
app.use(bodyParser());

//app.use(koaBody());
app.use(cors({ origin: '*' }));

app.use(router.routes());
app.use(router.allowedMethods());

render(app, {
  root: path.join(__dirname, '/controllers/views'),
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: false,
});

// Start server
app.listen(variables.appPort, () => {
  console.log(`API server listening on ${variables.host}:${variables.appPort}`);
});

// Exports app
module.exports = app;
