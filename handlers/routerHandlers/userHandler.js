const data = require('../../lib/data');
const {hash} = require('../../helper/utilities');
const {parseJSON} = require('../../helper/utilities');

const Handler = {};

Handler.userHandler=(requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        Handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

Handler._users = {};

Handler._users.get = (requestProperties, callback) => {
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



Handler._users.post = (requestProperties, callback) => {
    const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean' && requestProperties.body.tosAgreement === true ? true : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        //make sure that the user doesn't already exist
        data.read('users', phone, (err) => {
            if (err) {
                //create the user
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                };

                data.create('users', phone, userObject, (err) => {
                    if (!err) {
                        callback(200, { message: 'User created successfully' });
                    } else {
                        callback(500, { error: 'Could not create the user' });
                    }
                });
            } else {
                callback(400, { error: 'A user with that phone number already exists' });
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request' });
    }

};




Handler._users.put = (requestProperties, callback) => {
    const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    if (phone) {
        const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
        const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
        const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

        if (firstName || lastName || password) {
            //lookup the user
            data.read('users', phone, (err, u) => {
                if (!err && u) {
                    const userData = { ...parseJSON(u) };

                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }

                    //store the updated data
                    data.update('users', phone, userData, (err) => {
                        if (!err) {
                            callback(200, { message: 'User updated successfully' });
                        } else {
                            callback(500, { error: 'Could not update the user' });
                        }
                    });
                } else {
                    callback(400, { error: 'The specified user does not exist' });
                }
            });
        } else {
            callback(400, { error: 'You have a problem in your request' });
        }
    } else {
        callback(400, { error: 'Invalid phone number. Please try again!' });
    }
};

Handler._users.delete = (requestProperties, callback) => {
    const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    if (phone) {
        //lookup the user
        data.read('users', phone, (err, u) => {
            if (!err && u) {
                data.delete('users', phone, (err) => {
                    if (!err) {
                        callback(200, { message: 'User deleted successfully' });
                    } else {
                        callback(500, { error: 'Could not delete the user' });
                    }
                });
            } else {
                callback(400, { error: 'Could not find the specified user' });
            }
        });
    }
}; 






module.exports = Handler;