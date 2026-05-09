const Handler = {};

Handler.notFoundHandler=(requestProperties, callback) => {
    console.log('handler not found called');
    callback(404, { message: '404 Not Found' });
};











module.exports = Handler;