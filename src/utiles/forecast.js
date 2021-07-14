const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=71b4e5dab350f7f9c9bbdcfd14f2f345&query=' + latitude + "," + longitude + '&units=m'


    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable connect to weather servise", undefined)
        } else if (body.error) {
            console.log(body.error)
            callback("unable to locate your address! plz try something els!!! ", undefined)
        } else {

            callback(undefined, " The location is " + body.location.region + " and the current temperature is: " + body.current.temperature + " &  wind direction is: " + body.current.wind_dir + " , humidity is: " + body.current.humidity + " the time is : " + body.current.observation_time + " & weather decrition is: " + body.current.weather_descriptions + ".")
        }
    })
}

module.exports = forecast