const { sign } = require('jsonwebtoken');

// Create tokens
// ----------------------------------
const createAccessToken = userId => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = userId => {
  console.log('-----------CREATED REFRESH')
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '3d',
  });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (res, req, accesstoken) => {
  res.send({
    accesstoken,
    email: req.body.email,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    path: '/refresh_token',
    sameSite: 'lax'
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken
};