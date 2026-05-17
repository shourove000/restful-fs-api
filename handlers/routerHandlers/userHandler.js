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
    console.log(requestProperties);
    callback(200, { message: 'User handler response' });
};




Handler._users.post = (requestProperties, callback) => {


};




Handler._users.put = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, { message: 'User handler response' });
};

Handler._users.delete = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, { message: 'User handler response' });
}; 






module.exports = Handler;