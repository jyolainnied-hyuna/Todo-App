const Joi = require('joi');
const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();

const todosArray = []

//response to add request
router.post('/add', (req, res) =>
{
    //validating input
    const schema = {
        Title: Joi.string().min(5).required(),          //title must be string and at least 3 characters
        Description: Joi.string().min(10).required()
    }
    
    const result =Joi.validate(req.body, schema);
    
    if(result.error) return res.status(400).send(result.error.details[0].message);          //Bad Request
    
    let date = new Date();
    
    let task = {
        ID: uniqid(),
        Title: req.body.Title,
        Description: req.body.Description,
        Status: 'To Do',
        DateCreated: date.getMonth()+1 + '/'+ date.getDate() + '/' + date.getFullYear() + ' -- ' + date.getHours() +':'+String(date.getMinutes()).padStart(2, '0'),
        DateCompleted: 'No'  
    };

    //push new task object to todoArray
    todosArray.push(task);

    res.send(task);
});


//response to delete a task request
router.delete('/delete', (req, res) =>
{  
    //checks is task exists
    const task = todosArray.find(t => t.ID === parseInt(req.body.ID));
    if(!task) res.status(404).send("This task doesn't exist");   //404: Object not found
    
    //find index of task in aaray
    const index = todosArray.indexOf(task);
    
    //remove all elements from todoArray
    todosArray.splice(index,1);
    
    res.send('Task has been deleted!');
});


//response to delete all tasks request
router.delete('/deleteAll', (req, res) =>
{
    //remove all elements from todoArray
    todosArray.splice(0,todosArray.length);

    res.send('Task(s) will be deleted!');
});


//response to delete request
router.post('/edit', (req, res) =>
{  
    //checks is task exists
    const task = todosArray.find(t => t.ID === req.body.ID);
    if(!task) res.status(404).send("This task doesn't exist");      //404: Object not found
    
    //find index of task in aaray
    const index = todosArray.indexOf(task);
    
    //send task item 
    res.send(todosArray[index]);
});


//response to show all task
router.get('/showAll', (req, res) =>
{
    res.send(todosArray);
});


module.exports = router;