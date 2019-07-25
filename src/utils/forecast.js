const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/1c850a2f2efb247b6717764b92ccad19/" + latitude + "," + longitude + "?units=si";

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service.");
        }
        else if (body.error) {
            callback("Unable to find location.");
        }
        else {
            const today = body.daily.data[0];
            const currently = body.currently;
            callback(undefined, today.summary + " It is currently " + currently.temperature + " degrees out. There is a " + currently.precipProbability + "% chance of rain.");
        }
    });
}

module.exports = forecast;