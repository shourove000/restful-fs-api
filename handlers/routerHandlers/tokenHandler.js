//token handler

const data = require('../../lib/data');
const {hash} = require('../../helper/utilities');
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
    const phone = typeof(requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        //lookup the user
        data.read('users', phone, (err, u) => {
                const user = { ...parseJSON(u) };
            if (!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, { error: 'User not found' });
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request' });
    }
};



Handler._tokens.post = (requestProperties, callback) => {


};




Handler._tokens.put = (requestProperties, callback) => {
};

Handler._tokens.delete = (requestProperties, callback) => {
}; 






module.exports = Handler;