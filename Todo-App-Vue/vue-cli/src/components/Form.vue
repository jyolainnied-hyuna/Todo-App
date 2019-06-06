<template>
  <form id="form_task" method="post" >
        <h4> Enter New Task</h4>
        <small>Title should not be less than 5 letters.</small>
        <input type="text" id="title" placeholder="Title of the task" required>
        <br><br><small>Description should not be less than 10 characters.</small><br>
        <textarea type="text" id='description' placeholder="Description of the task" required></textarea>
        
        <br><br>
        <input type="submit" id="submit_button" value="Add">
        <br>
    </form>
</template>