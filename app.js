const express = require('express');
const bookRoutes = require('./routes/libraryRoutes');
const rateLimiter = require('express-rate-limit');
const bodyParser = require('body-parser');


const app = express();

const limiter = rateLimiter({
    max: 100,
    window: 60*60*1000,  //1hr
    message: 'Too many requests, try after an hour'
})

app.use('*',limiter);
app.use(bodyParser.json());
app.use(bookRoutes);


module.exports = app;