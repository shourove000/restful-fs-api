const Handler = {};

Handler.samplehandler=(requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, { message: 'Sample handler response' });
};











module.exports = Handler;