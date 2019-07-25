const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gerardo Ramírez'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gerardo Ramírez'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gerardo Ramírez',
        message: 'Help message'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        });
    }

    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast (latitude, longitude, (error, forecastResponse) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastResponse,
                location,
                address: req.query.address
            });
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Gerardo Ramírez',
        error: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Gerardo Ramírez',
        error: 'Page not found'
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});