const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser')
const routes = require('./config/routes.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//for parsing post request data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

//for mapping request routes to files/actions
app.use('',routes);
app.use(express.static(__dirname + '/static'));

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening!');
});
