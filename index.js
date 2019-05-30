
        //Declaring variables
        var form = document.querySelector('form');
        var todoList = document.getElementById('todoList');
        var clear_button = document.getElementById('clear');
        var title_input = document.getElementById('title');
        var desc_input = document.getElementById('description');

        // //check if todosArray exists in local storage
        // //if it doesn't exist in local storage then it is created
        // var todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')):[];

        // //set Local storage item
        // localStorage.setItem('todos', JSON.stringify(todosArray));

        // //get local storage item
        // var storage = JSON.parse(localStorage.getItem('todos'));
        
        //Event listener to form
        form.addEventListener('submit', function(event)
        {
            //prevent page from refreshing after form submit
            event.preventDefault();           
            
            //create task object
            // var taskOject = createTaskObject(title_input, desc_input)

            // //push new task object to todoArray
            // todosArray.push(taskOject);
            
            // //update local storage item
            // localStorage.setItem('todos', JSON.stringify(todosArray));

            //call to todoMaker function
            todoMaker(taskOject);

            //reset input value
            title_input.value = '';
            desc_input.value = '';
        })

         //function to create task object
         var createTaskObject = function (title_value, description_value)
         {
             taskObject =
             {
                 ID: storage.length +1 ,
                 Title : title_value.value,
                 Description: description_value.value,
                 Status: 'To Do',
                 DateCreated: new Date(),
                 DateCompleted: 'Not yet'  
             }
             return taskObject;
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

        //todoMaker function

        var todoMaker = function todoMaker(value)
        {
            //create div element and assign className
            var todo = document.createElement('div');
            todo.className = "task";

            //Add info to task display
            todo.innerHTML = '<strong>Title</strong>: ' + value["Title"] + '<br> <strong>Description</strong>: ' + value["Description"]+ '<br> <strong>Status</strong>: ' + value["Status"] + '<br> <strong>Date Created</strong>: ' + value["DateCreated"]+ '<br> <strong>Date Completed</strong>: ' + value["DateCompleted"];
            todoList.appendChild(todo);
             
             //Add edit button
             editButton(value);

              //Add delete button
              deleteButton(value);                   
        };

        //run todoMaker function on all the items in the todoArray
        for(var i = 0; i < storage.length; i++)
        {
            todoMaker(storage[i]);
        }

        //clear all
        clear_button.addEventListener('click', function()
        {
            //calls clear method in local storage
            localStorage.clear();

            while(todoList.firstChild)
            {
                todoList.removeChild(todoList.firstChild);
            }
        })
