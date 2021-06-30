/** @format */

'use strict';

const Validator = require('validatorjs');
const errorHandler = require('../helpers/errorHandler');
const userModel = require('../models/Users');

const registerRules = {
  fullNme: 'required',
  email: 'required|email',
  phone: 'required',
  password: 'required|min:8',
};

// scaffolding
const user = {};

user.register = async (ctx) => {
  try {
    const request = ctx.request.body;

    const validation = new Validator(request, registerRules);
    if (validation.fails()) {
      throw {
        status: 500,
        message: 'Invalid request',
        error: validation.errors.all(),
      };
    }
    const hasDuplicate = await userModel.checkDuplicacy(request.email);
    if (hasDuplicate) {
      throw {
        status: 400,
        message: 'Email address already registered',
      };
    }
    await userModel.create(request);

    ctx.body = {
      message: 'Successfully registered',
    };
  } catch (e) {
    const { status, message, error } = e;
    console.log(e);
    ctx.status = status;
    ctx.body = { message, error };
  }
};
module.exports = user;
