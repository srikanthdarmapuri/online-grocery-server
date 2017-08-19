var express = require('express');
var bodyParser = require('body-parser');
var blueBird = require('bluebird');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onlinegrocery');
mongoose.Promise = blueBird;

var itemRouter = require('./routes/item');

app.use('/item', itemRouter);

app.use(function (req, res) {
    res.json({message: 'Invalid Request'});
});

app.listen(port);
console.log('Grocery Online Server Running on Port:' + port);