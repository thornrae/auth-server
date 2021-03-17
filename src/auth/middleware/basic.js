'use strict';

const base64 = require('base-64');
const users = require('../models/users.js');
// const User = require('../models/users.js');


module.exports = async (req, res, next) => {

  // console.log('basic req.headers.authorization ->', req.headers.authorization);
  if (!req.headers.authorization) { next('Invalid Login'); return; }
  // if (!req.headers.authorization) { return _authError(); }


  let basic = req.headers.authorization.split(' ').pop();
  // console.log('basic->', basic);
  let [username, pass] = base64.decode(basic).split(':');
  // console.log('user->', username)
  // console.log('pass->', pass)

  users.authenticateBasic(username, pass)
    .then (validUser => {
      // console.log('validuser pre req.user', validUser);
      req.user = validUser;
      next();
    })
    .catch(err => next('invalid login'));



  // try {
  //   req.users = await users.authenticateBasic(users, pass)
  //   console.log('req.users->', req.users) //this does not happen.
  //   next();
  // } catch (e) {
  //   res.status(403).send('Invalid Login');
  // }

  // users.authenticateBasic(user, pass)
  //   .then(validUser => {
  //     req.user = validUser
  //     next();
  //   }).catch(err => next('invalid login'));

}
