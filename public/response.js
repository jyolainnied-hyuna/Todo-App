//Declaring variables
var form = document.querySelector('form');
var todoList = document.getElementById('todoList');
var clear_button = document.getElementById('clear');
var title_input = document.getElementById('title');
var desc_input = document.getElementById('description');

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
        makeTaskDiv(task_details);
    });
});

///Listen for edit and delete events
todoList.addEventListener('click', function(event)
{
    if(event.target.className == "delete")
    {
        console.log(event.target.value);
        deleteTask(event.target.value);
    }

    if(event.target.className == "edit")
    {
        console.log(event.target.value);
    }
   
})

function deleteTask(value)
{
    $.ajax({
        type: 'delete',
        url: '/delete',
        data: value,
        dataType: 'text'
    })
    .done(function(data){
        console.log(data);
    });

}

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

        todoList.innerHTML = "<h3 style='color:#fff; text-align:center'>" + data + "</h3>";

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

var makeTaskDiv = function todoMaker(value)
{
    //create div element and assign className
    var todo = document.createElement('div');
    todo.className = "task";

    //Add info to task display
    todo.innerHTML = '<strong>Title</strong>: ' + value.Title + '<br> <strong>Description</strong>: ' + value.Description + '<br> <strong>Status</strong>: ' + value.Status + '<br> <strong>Date Created</strong>: ' + value.DateCreated + '<br> <strong>Date Completed</strong>: ' + value.DateCompleted;
    todoList.appendChild(todo);
     
     //Add edit button
        editButton(value);

      //Add delete button
      deleteButton(value);                   
};


var editButton = function(value)
{
    //creation of edit option
    var edit_task = document.createElement('button');
    
    edit_task.textContent = "Edit";
    edit_task.className = "edit";
    edit_task.value = value["ID"]; //in order to unquiely identify item
    todoList.appendChild(edit_task);

};

var deleteButton = function(value)
{
    //creation of delete option
    var delete_task = document.createElement('button');
    
    delete_task.textContent = "Delete";
    delete_task.className = "delete";
    delete_task.value = value["ID"];  //in order to unquiely identify item
    todoList.appendChild(delete_task);
};