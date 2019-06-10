const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const task = require('./routes/task');
const home = require('./routes/home');


//connect to database, this is a promise
mongoose.connect('mongodb://localhost/TaskDB', { useFindAndModify: false })                 
    .then(() => console.log('Connect to TaskDB..'))
    .catch(err => console.group('Could not connect to TaskDB...',err))

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