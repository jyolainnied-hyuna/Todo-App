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
    url: '/show',
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
        url: '/add',
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
        location.reload();                  //reload page so that updated list of tasks can be shown
    }

    if(event.target.className == "edit")
    {
        editTask(event.target.value);
        //location.reload();                  //reload page so that updated list of tasks can be shown
    }
   
});

//AJAX function to send delete task request
function editTask(value)
{
    $.ajax({
        type: 'post',
        url: '/edit',
        data: {ID: value},
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
        url: '/delete',
        data: {ID: value},
        dataType: 'text'
    })
};

//AJAX to Clear All tasks
clear_button.addEventListener('click', function(e)
{
    e.preventDefault();  //prevents form submit from refreshing page

    $.ajax({
        type: 'delete',
        url: '/clear',
        data: 'clear all',
        dataType: 'text'
    })
    .done(function(data){
        while(todoList.firstChild)
        {
            todoList.removeChild(todoList.firstChild);
        }

        alert(data);

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
    task_containner.id = 'task_containner-'+ value.ID;
    
    //create div element and assign className
    var todo = document.createElement('div');
    todo.className = "task";
    todo.id = 'task-'+ value.ID;

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
    edit_task.value = value["ID"]; //in order to unquiely identify item
    task_containner.appendChild(edit_task);

};

var addDeleteButton = function(value, task_containner)
{
    //creation of delete option
    var delete_task = document.createElement('button');
    
    delete_task.textContent = "Delete";
    delete_task.className = "delete";
    delete_task.value = value["ID"];  //in order to unquiely identify item
    task_containner.appendChild(delete_task);
};
