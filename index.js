const express = require('express');
const database = require('./lib/db.js');
const route = require('./lib/route.js');
const routesApi = require('./routes/api.js');
const routesWeb = require('./routes/web.js');
const bodyParser = require('body-parser');
const {exec} = require('child_process');


const app = express();
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

global.db = new database();
global.exec = exec;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

new route(app, routesApi, routesWeb);

app.listen("8898");
