const cypto = require('crypto');
const environment = require('./environments');

const utilities = {};

utilities.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }
    return output;
};



utilities.hash = (str) => {
    if (typeof(str) === 'string' && str.length > 0) {
        const hash = cypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

module.exports = utilities;