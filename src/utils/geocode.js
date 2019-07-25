const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoiZ2VyYXJkb3Jtejk4IiwiYSI6ImNqeHppanFicDAxdjUzZHBnamhnaXJjNWIifQ.uYA8SStz4ztt4i7kkmDV2A";

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geolocation services.");
        }
        else if (body.features.length == 0) {
            callback("Unable to find location. Try again with different search term.");
        }
        else {
            const feature = body.features[0];
            
            callback(undefined, {
                latitude: feature.center[1],
                longitude: feature.center[0],
                location: feature.place_name
            });
        }
    });
}

module.exports = geocode;