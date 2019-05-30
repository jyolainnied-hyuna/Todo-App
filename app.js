const Joi = require('joi');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



//check if todosArray exists in local storage
//if it doesn't exist in local storage then it is created
const todosArray = []

app.post('/', (req, res) =>
{
    res.sendFile('index.html');
});

app.post('/add', (req, res) =>
{
    var date = new Date();
    
    var task = {
        ID: todosArray.length + 1,
        Title: req.body.Title,
        Description: req.body.Description,
        Status: 'To Do',
        DateCreated: date.getMonth()+1 + '/'+ date.getDate() + '/' + date.getFullYear() + ' -- ' + date.getHours() +':'+date.getMinutes(),
        DateCompleted: 'No'  
    };

    //push new task object to todoArray
    todosArray.push(task);

    res.send(task);
});

app.delete('/delete', (req, res) =>
{
    
    //remove all elements from todoArray
    todosArray.splice(0,todosArray.length);
    res.send('Task has been deleted!');
});


app.delete('/clear', (req, res) =>
{
    //remove all elements from todoArray
    todosArray.splice(0,todosArray.length);

    res.send('Task(s) has been deleted!');
});

app.listen(3000,  console.log('Listening on port 3000...'));
