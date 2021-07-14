const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require("request");

const geocode = require('./utiles/geocode')
const forecast = require('./utiles/forecast')

const app = express()



//Define paths for express config
const publicDirectery = path.join(__dirname, "../public")
const viewpath = path.join(__dirname, "../templates/views")
const partialspath = path.join(__dirname, '../templates/partials')

// setup the handlebar engine and views location
app.set('view engine', 'hbs')
app.set("views", viewpath)
hbs.registerPartials(partialspath)

//setup static directori to server.
app.use(express.static(publicDirectery))


app.get('', (req, res) => {
    res.render("index", {
        title: 'weather app',
        name: "Ashutosh bansal"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Ashutosh bansal"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        helptext: "This is some helpfull text",
        name: "Ashutosh bansal"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide the search term'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    Forecast: forecastData,
                    location,
                    address: req.query.address
                })

            })
        })
    }


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide the search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: {}
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Ashutosh bansal',
        errormsg: "Help Artical Not Found"


    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Ashutosh bansal',
        errormsg: "Page Not Found"

    })
})

// set the localhost domain.
app.listen(3000, () => {
    console.log('Server is up');
})