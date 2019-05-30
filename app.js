const Joi = require('joi');
const express = require('express');
const app = express();


//route modules
const addTask = require('./routes/add');
const createTaskList = require('./routes/create');

app.use(express.json());

app.use('/api/create', createTaskList);
app.use('/api/addtask', addTask);
// app.use('/api/delete', deleteTask);



app.set('view engine', 'pug');
app.set('views', './views');



app.listen(3000,  console.log('Listening on port 3000...'));
