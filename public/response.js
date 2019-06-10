//Declaring variables
var form = document.querySelector('form');
var todoList = document.getElementById('todoList');
var clear_button = document.getElementById('clear');
var title_input = document.getElementById('title');
var desc_input = document.getElementById('description');

//show all task on page load
$( document ).ready(function() {
    $.ajax({
    type: 'get',
    url: 'api/showAll',
    dataType: 'text'
    })
    .done(function(data){
    var task_details = JSON.parse(data);

    for(i =0; i < task_details.length; i++)
    {
        addTaskDiv(task_details[i]);   
    }
        
    });
});

//AJAX to add task
form.addEventListener('submit', function(e)
{
    e.preventDefault();  //prevents form submit from refreshing page

    //create task object
    var taskOject = createTaskObject(title_input, desc_input);

    //reset input value
    title_input.value = '';
    desc_input.value = '';

    $.ajax({
        type: 'post',
        url: '/api/add',
        data: taskOject,
        dataType: 'text'
    })
    .done(function(data){
        var task_details = JSON.parse(data);
        addTaskDiv(task_details);
    });
});

///Listen for edit and delete events
todoList.addEventListener('click', function(event)
{    
    if(event.target.className == "delete")
    {
        deleteTask(event.target.value);
        document.location.reload();  
    }

    if(event.target.className == "edit")
    {
        getTask(event.target.value);

//        editTask(event.target.value);
//        document.location.reload(); 
    }
   
});

//AJAX function to send delete task request
function editTask(value)
{
     //create task object
    var taskObject =
    {
        Title : "title_value.value",
        Description: "description_value.value"
    };
    
    $.ajax({
        type: 'put',
        url: '/api/edit/'+ value,
        data: taskObject,
        dataType: 'text'
    })
    .done(function(data){
        var task_details = JSON.parse(data);
        console.log(task_details);
    });
};

//AJAX function to send delete task request
function deleteTask(value)
{   
    $.ajax({
        type: 'delete',
        url: '/api/delete/'+ value,
        dataType: 'text'
    })
};

//AJAX function to send get a task request
function getTask(value)
{   
    $.ajax({
        type: 'get',
        url: '/api/getTask/'+ value,
        dataType: 'text'
    })
    .done(function(data){
        makeEditForm(JSON.parse(data));
    })
};

//AJAX to Clear All tasks
clear_button.addEventListener('click', function(e)
{
    e.preventDefault();  //prevents form submit from refreshing page

    $.ajax({
        type: 'delete',
        url: '/api/deleteAll',
        dataType: 'text'
    })
    .done(function(data){
        alert(data);
        document.location.reload();
    });
});



//function to create task object
var createTaskObject = function (title_value, description_value)
{
    taskObject =
    {
        Title : title_value.value,
        Description: description_value.value,
    }
    return taskObject;
};


var addTaskDiv = function (value)
{
    //create div element and assign className
    var task_containner = document.createElement('div');
    task_containner.className = "task_containner";
    task_containner._id = 'task_containner-'+ value._id;
    
    //create div element and assign className
    var todo = document.createElement('div');
    todo.className = "task";
    todo._id = 'task-'+ value._id;

    //Add info to task display
    todo.innerHTML = '<strong>Title</strong>: ' + value.Title + '<br> <strong>Description</strong>: ' + value.Description + '<br> <strong>Status</strong>: ' + value.Status + '<br> <strong>Date Created</strong>: ' + value.DateCreated + '<br> <strong>Date Completed</strong>: ' + value.DateCompleted; 
     
    task_containner.appendChild(todo);
    
     //Add edit button
      addEditButton(value, task_containner);

      //Add delete button
      addDeleteButton(value, task_containner);    
    
     todoList.appendChild(task_containner);
};

var addEditButton = function(value,task_containner)
{
    //creation of edit option
    var edit_task = document.createElement('button');
    
    edit_task.textContent = "Edit";
    edit_task.className = "edit";
    edit_task.value = value["_id"]; //in order to unquiely identify item
    task_containner.appendChild(edit_task);

};

var addDeleteButton = function(value, task_containner)
{
    //creation of delete option
    var delete_task = document.createElement('button');
    
    delete_task.textContent = "Delete";
    delete_task.className = "delete";
    delete_task.value = value["_id"];  //in order to unquiely identify item
    task_containner.appendChild(delete_task);
};

var makeEditForm =function(values){
   let edit_form = document.createElement('form'); 
    edit_form.id = "edit_form";
    edit_form.innerHTML =  `<h4> Edit Task</h4>
    <small>Title should not be less than 5 letters.</small>
    <input type="text" id="title" value=${values.Title} required><br><br>
    <small>Description should not be less than 10 characters.</small><br>
    <textarea type="text" id='description' required>${values.Description}</textarea><br>
    <p>Status</p>
    <input type="radio" name="status" value="To Do" checked>To Do<br>
    <input type="radio" name="Status" value="Completed">Completed<br>
    <p>Date Created: ${values.DateCreated}</p>
    <p>Date Completed: ${values.DateCompleted}</p><br>
    <input type="submit" id="edit_button" value="Edit"><br>` ;
        
    let form = document.getElementById('form');
    let task_form = document.getElementById('form_task');
    
    form.replaceChild(edit_form, form_task);    

}
