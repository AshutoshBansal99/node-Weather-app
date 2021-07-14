const request = require("request");


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNodXRvc2gtYmFuc2FsIiwiYSI6ImNrcWgwMmU4bzA2ODcyb2x5MmhmeHk3ZTEifQ.HuVcMzWvzJF1QqXXjCHDxw&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect the t loation services', undefined);
        } else if (body.features.length === 0) {
            callback('unable to find the loction ! plz try another.', undefined)

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
