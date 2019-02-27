// dependencies

const express = require('express');
const bodyParser = require('body-parser');

// set up server

const app = express();
const port = 80;
app.listen(process.env.PORT || port);
console.log('\n local server is running on port ' + port + '!');

// set up app

// public folder for static files

app.use(express.static('app'));

// enable body parsing for json format

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
