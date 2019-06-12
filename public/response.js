window.onerror = function(message, source, lineno, colno, error) { 
    alert(error);
 }


//Declaring variables
let formDiv = document.getElementById('form');
let add_form = document.getElementById('form_task');    
let todoList = document.getElementById('todoList');
let clear_button = document.getElementById('clear');


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
        createTaskDiv(task_details[i]);   
    }
        
    });
});

formDiv.addEventListener('submit', (event)=>
{
    event.preventDefault();

    (event.target.id == "form_task")? addTask() : editTask();
});


// //AJAX to add task
function addTask()
{
    //create task object
    let taskOject = createTaskObject();

    //reset input value
    document.getElementById('title').value = '';
    desc_input = document.getElementById('description').value = '';

    $.ajax({
        type: 'post',
        url: '/api/add',
        data: taskOject,
        dataType: 'text'
    })
    .done(function(data){
        let task_details = JSON.parse(data);
        createTaskDiv(task_details);
    })
    .fail(function(data){
        console.log(JSON.parse(data.responseText));
    });
}

// //AJAX to add task
function editTask()
{
    let editForm = document.getElementById('edit_form');
    
    //create task object
    let title_input = document.getElementById('title');
    let desc_input = document.getElementById('description');

    let status = $("input[name='status']:checked").val();
    let t_date;
    (status === 'Completed')? t_date = Date(): t_date = undefined;
   
    
    let taskObject =
    {
        Title : title_input.value,
        Description: desc_input.value,
        Status: status,
        DateCompleted: t_date
    }

    let id = editForm.getAttribute("name");
   $.ajax({
       type: 'put',
       url: '/api/edit/'+ id,
       data: taskObject,
       dataType: 'text'
   })
   .done(function(data){ 
       var task_details = JSON.parse(data);
       document.location.reload(); 

   });
};


///Listen for edit and delete events
todoList.addEventListener('click', ()=>
{    
    if(event.target.className == "delete")  
    {
        deleteTask(event.target.value);
        document.location.reload();  
    }

    if(event.target.className == "edit")
    {
        getTask(event.target.value);
    }
   
});

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
        createEditForm(JSON.parse(data));
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
function createTaskObject()
{
    let title_input = document.getElementById('title');
    let desc_input = document.getElementById('description');
    
    taskObject =
    {
        Title : title_input.value,
        Description: desc_input.value,
    }
    return taskObject;
}


function back()
{
    document.location.reload();
}

function createTaskDiv(value)
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
    todo.innerHTML = `  <strong>Title</strong>: ${value.Title}<br>
                        <strong>Description</strong>: ${value.Description}<br> 
                        <strong>Status</strong>:  ${value.Status} <br>
                        <strong>Date Created</strong>: ${value.DateCreated }<br>
                        <strong>Date Completed</strong>: ${(value.Status === 'To Do')? "Pending": value.DateCompleted}`; 
     
    task_containner.appendChild(todo);
    
     //Add edit button
     createEditButton(value, task_containner);

      //Add delete button
      createDeleteButton(value, task_containner);    
    
     todoList.appendChild(task_containner);
};

function createEditButton(value,task_containner)
{
    //creation of edit option
    var edit_task = document.createElement('button');
    
    edit_task.textContent = "Edit";
    edit_task.className = "edit";
    edit_task.value = value["_id"]; //in order to unquiely identify item
    task_containner.appendChild(edit_task);

};

function createDeleteButton(value, task_containner)
{
    //creation of delete option
    var delete_task = document.createElement('button');
    
    delete_task.textContent = "Delete";
    delete_task.className = "delete";
    delete_task.value = value["_id"];  //in order to unquiely identify item
    task_containner.appendChild(delete_task);
};

function createEditForm(values){
    let edit_form = document.createElement('form');
    edit_form.id = "edit_form";
    edit_form.setAttribute("name", values._id);
    edit_form.innerHTML =  `<h4> Edit Task</h4>
    <small>Title should not be less than 5 letters.</small>
    <input type="text" id="title" value=${values.Title} required><br><br>
    <small>Description should not be less than 10 characters.</small><br>
    <textarea type="text" id='description' required>${values.Description}</textarea><br>
    <p>Status</p>
    ${(values.Status === 'To Do')?"<input type='radio' name='status' value='To Do' checked>To Do":"<input type='radio' name='status' value='To Do'>To Do" } <br>
    ${(values.Status === 'Completed')?"<input type='radio' name='status' value='Completed' checked>Completed":"<input type='radio' name='status' value='Completed'>Completed" } <br>
    <p>Date Created: ${values.DateCreated}</p>
    ${(values.Status === 'To Do')? "Date Completed: Pending":"Date Completed: "+ values.DateCompleted }<br><br>
    <input type="submit" id="edit_button" value="Edit">
    <button id="edit_button" onclick="back()">Back</button><br>` ;
        
    formDiv.replaceChild(edit_form, add_form);    
}
