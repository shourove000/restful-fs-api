//token handler

const data = require('../../lib/data');
const {hash} = require('../../helper/utilities');
const {createRandomString} = require('../../helper/utilities');
const {parseJSON} = require('../../helper/utilities');
const Handler = {};

Handler.tokenHandler=(requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        Handler._tokens[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

Handler._tokens = {};

Handler._tokens.get = (requestProperties, callback) => {

};



Handler._tokens.post = (requestProperties, callback) => {
    const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
  if (phone && password) {
        //lookup the user who matches that phone number
        data.read('users', phone, (err, userData) => {
          const userObject = parseJSON(userData);
          if (!err && userObject.password) {
            const hashedpassword = hash(password);
            if (hashedpassword === userObject.password) {
              const tokenId = createRandomString(20);
              const expires = Date.now() + 60 * 60 * 1000;
              const tokenObject = {
                phone,
                id: tokenId,
                expires
              };

              //store the token
              data.create('tokens', tokenId, tokenObject, (err) => {
                if (!err) {
                  callback(200, tokenObject);
                } else {
                  callback(500, {error: 'There was a problem in server side'});
                }
              });
            } else {
              callback(400, {error: 'Password is not valid'});
            }
          } else {
            callback(400, {error: 'User not found'});
          }
        });
    } else {
        callback(400, { error: 'You have a problem in your request' });
    }

};




Handler._tokens.put = (requestProperties, callback) => {
};

Handler._tokens.delete = (requestProperties, callback) => {
}; 






module.exports = Handler;