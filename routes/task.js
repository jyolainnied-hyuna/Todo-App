const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();

//define a schema for tasks
const taskSchema = new mongoose.Schema({
    Title: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength:50
    },
    Description:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    Status: {
       type: String,
       default: 'To Do'
    },
    DateCreated: {
        type: Date, 
        default: Date.now
    },
    DateComplete: {
        type: Date
    }
});

//create model from task schema
const Task = mongoose.model('Task', taskSchema);


//response to show all tasktodosArray
router.get('/showAll', async(req, res) =>
{
    const tasks = await Task.find().sort('DateCreated');
    res.send(tasks);
});

//response to add request
router.post('/add', async(req, res) =>
{
    //validating input
    const result = validateTask (req.body);  
    if(result.error) return res.status(400).send(result.error.details[0].message);          //Bad Request
    
    //create document
    let task = new Task({
        Title: req.body.Title,
        Description: req.body.Description
    });

    //save document to database
    task = await task.save();
    res.send(task);
});


//response to edit request
router.put('/edit/:id', async(req, res) =>
{  
    //validating input
    const result = validateTask (req.body);  
    if(result.error) return res.status(400).send(result.error.details[0].message);          //Bad Request

    //checks if task exists and updates it
    const task = await Task.findByIdAndUpdate(req.params.ID,
        { 
        Title: req.body.Title,
        Description: req.body.Description,
        Status: req.body.Status,
        DateComplete: req.body.DateComplete
    }, {new: true});
    if(!task) res.status(404).send("This task doesn't exist");   //404: Object not found

    //send task item 
    res.send(task);
});

//response to delete a task request
router.delete('/delete/:id', async(req, res) =>
{  
    //checks is task exists and deletes it
    const task = await Task.findByIdAndRemove(req.params.ID);
    if(!task) res.status(404).send("This task doesn't exist");   //404: Object not found
    
    res.send(task);
});


//response to delete all tasks request
router.delete('/deleteAll', async(req, res) =>
{
    //checks is task exists and deletes it
    const task = await Task.delete({});
    if(!task) res.status(404).send("This task doesn't exist");   //404: Object not found

    res.send('Task(s) will be deleted!');
});

//used to validate requests
function validateTask (body){
    //validating input
    const schema = {
    Title: Joi.string().min(5).max(50).required(),       
    Description: Joi.string().min(10).max(225).required()
    }

    return Joi.validate(body, schema);
}


module.exports = router;