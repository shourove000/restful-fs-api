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

utilities.createRandomString = (strLength) => {
    strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let output = '';
        for (let i = 1; i <= strLength; i++) {
            const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            output += randomCharacter;
        }
        return output;
    } else {
        return false;
    }
};



module.exports = utilities;