const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const task = require('./routes/task');
const home = require('./routes/home');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());

app.use('/api', task);
app.use('/', home);

app.use(bodyParser.json()); // to support JSON-encoded bodies

 // to support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); 

//server listening on port 3000
app.listen(3000,  console.log('Todo-App Listening on port 3000...'));
