/** @format */

const Router = require('koa-router');

const { email, postEmail } = require('./controllers/sendmail');
const { register } = require('./controllers/user');
const routers = new Router();

routers.get('/postemail', email);

routers.post('/postemail', postEmail);
routers.post('/users', register);

module.exports = routers;
