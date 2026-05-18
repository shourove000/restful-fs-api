const {samplehandler} = require('./handlers/routerHandlers/sampleHandler');
const {userHandler} = require('./handlers/routerHandlers/userHandler');
const {tokenHandler} = require('./handlers/routerHandlers/tokenHandler');

const routes = {
    sample: samplehandler,
    users : userHandler,
    token : tokenHandler,

};




module.exports = routes;