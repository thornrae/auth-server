'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  try {
    // console.log('bearer req.headers', req.headers.authorization);
    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();
    // console.log('token..', token)
    const validUser = await users.authenticateWithToken(token);
    // console.log('validuser..', validUser);
    req.user = validUser;
    req.token = token;
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');;
  }
}