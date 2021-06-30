/**
 * /*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Mojahid
 * Date: 6/28/2021
 *
 * @format
 */
/* eslint-env node */

const utilities = {};

// create random string length
utilities.createRandomString = (strlength) => {
  let len;
  len = typeof strlength === 'number' && strlength > 0 ? strlength : false;
  if (len) {
    let output = '';
    const possibleChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (let i = 0; i < len; i++) {
      let currentRandomString = possibleChar.charAt(
        Math.floor(Math.random() * possibleChar.length)
      );
      output += currentRandomString;
    }
    return output;
  }
  return len;
};

// export module
module.exports = utilities;
