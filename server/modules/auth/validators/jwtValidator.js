
var jwt = require('jsonwebtoken');


/**
 * Checks for presence of token and that token hasn't expired.
 */
exports.isExpired = (token, offsetSeconds, decoded) => {

  let result;
  let iat = new Date(0); // The 0 here is the key, which sets the date to the epoch
  let exp = new Date(0); // The 0 here is the key, which sets the date to the epoch

  iat.setUTCSeconds(decoded.iat);
  exp.setUTCSeconds(decoded.exp);

  offsetSeconds = offsetSeconds || 0;

  if (!exp) {
    return false;
  }
  // console.log(new Date().valueOf() - iat.valueOf(), offsetSeconds * 60 * 1000);
  if (offsetSeconds)
    result = (new Date().valueOf() - iat.valueOf()) >= offsetSeconds * 60 * 1000;
  else
    result = exp.valueOf() < (new Date().valueOf() + (offsetSeconds * 60 * 1000));

  // console.log('Is user valid to generate new token ? ' + result);

  // Generate new token?
  return result
}

/**
* Will refresh the given token.  The token is expected to be decoded and valid. No checks will be
* performed on the token.  The function will copy the values of the token, give it a new
* expiry time based on the given 'expiresIn' time and will return a new signed token.
*
* @param token
* @param secretOrPrivateKey
* @return New signed JWT token
*/
exports.generateNewToken = (token, secretOrPrivateKey, ignoreExp) => {
  //TODO: check if token is not good, if so return error ie: no payload, not required fields, etc.

  var verified;
  var payload = jwt.decode(token);

  try {
    //verified = jwt.verify(token, secretOrPrivateKey);
    verified = jwt.verify(token, 'sifywaterDev101222', { algorithm: 'HS256'});
  }
  catch (error) {
    verified = null;
  }

  if (verified) {

    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions

    newToken = jwt.sign(payload, secretOrPrivateKey, { expiresIn: '1d', jwtid: '' + Math.floor(Math.random() * 20) });

    return newToken;
  }
  else {
    return null;
  }
}
