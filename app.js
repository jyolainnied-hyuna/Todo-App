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


const todosArray = []


//render page
app.post('/', (req, res) =>
{
    res.sendFile('index.html');
});


//response to show all task
app.get('/show', (req, res) =>
{
    res.send(todosArray);
});


//response to add request
app.post('/add', (req, res) =>
{
    let date = new Date();
    
    let task = {
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

//response to delete request
app.post('/edit', (req, res) =>
{  
    //checks is task exists
    const task = todosArray.find(t => t.ID === parseInt(req.body.ID));
    if(!task) res.status(404).send("This task doesn't exist");
    
    //find index of task in aaray
    const index = todosArray.indexOf(task);
    
    //send task item 
    res.send(todosArray[index]);
});

//response to delete request
app.delete('/delete', (req, res) =>
{  
    //checks is task exists
    const task = todosArray.find(t => t.ID === parseInt(req.body.ID));
    if(!task) res.status(404).send("This task doesn't exist");
    
    //find index of task in aaray
    const index = todosArray.indexOf(task);
    
    //remove all elements from todoArray
    todosArray.splice(index,1);
    
    res.send('Task has been deleted!');
});


//response to delete all request
app.delete('/clear', (req, res) =>
{
    //remove all elements from todoArray
    todosArray.splice(0,todosArray.length);

    res.send('Task(s) has been deleted!');
});


//server listening on port 3000
app.listen(3000,  console.log('Listening on port 3000...'));
