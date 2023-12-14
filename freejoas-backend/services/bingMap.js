
//create bing map service
const BingMapsService = require('request');

const bingMapsKey = process.env.BING_MAPS_KEY;

function getBingMapsKey() {
    return bingMapsKey;
}

function getBingMapsLocation(location) {
    return new Promise((resolve, reject) => {
        BingMapsService.get(`http://dev.virtualearth.net/REST/v1/Locations?query=${location}&key=${bingMapsKey}`, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    });
}

function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        BingMapsService.get(`http://dev.virtualearth.net/REST/v1/Locations?query=${location}&key=${bingMapsKey}`, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    });
}

module.exports = {
    getBingMapsKey,
    getBingMapsLocation,
    getCurrentLocation,
};
