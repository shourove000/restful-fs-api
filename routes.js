const {samplehandler} = require('./handlers/routerHandlers/sampleHandler');
const {userHandler} = require('./handlers/routerHandlers/userHandler');


const routes = {
    sample: samplehandler,
    user : userHandler,


};




module.exports = routes;