/** @format */
/*
 * Title: postemail Page
 * Description: For sending OTP to the user Email
 * Author:
 * Date: 6/27/2021
 *
 */

'use strict';

//dependecise
const nodemailer = require('nodemailer');

//internal dependencise
const { authInformation } = require('../variables/index');
const userModel = require('../models/Users');
const { createRandomString } = require('../helpers/utilities');

const test = {};

const transporter = nodemailer.createTransport({
  host: authInformation.mailHost,
  port: 587,
  service: authInformation.seviece,
  auth: {
    user: authInformation.userName,
    pass: authInformation.password,
  },
});

test.hello = (receiver, OTP) => {
  const options = {
    from: authInformation.userName,
    to: receiver,
    subject: 'Reset Pass',
    text: `Your requested OTP is ${OTP}.\nPlease use within 3 minutes.\nNever share with anyone.`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(`No error . OTP has sent been successfully`);
    }
  });
};

test.email = async (ctx) => {
  await ctx.render('partials');
};

test.postEmail = async (ctx) => {
  let email, purpose;
  if (typeof ctx.request.body === 'string') {
    const temp = JSON.parse(ctx.request.body);
    email = temp.email;
    purpose = temp.purpose;
  } else {
    email = ctx.request.body.email;
    purpose = ctx.request.body.purpose;
  }
  purpose = purpose.toUpperCase(); // otp, OTP,oTP and same other things are also valid
  const hasDuplicate = await userModel.checkDuplicacy(email);
  if (hasDuplicate) {
    switch (purpose) {
      case 'OTP':
        const token = createRandomString(20);
        test.hello(email, token);
        ctx.body = 'Email sending to ' + ' ' + email + ' with token ' + token;
        break;
      default:
        ctx.body = purpose + ' is not a valid purpose';
        break;
    }
  } else ctx.body = 'No user found with this mail ' + email;
};

module.exports = test;
