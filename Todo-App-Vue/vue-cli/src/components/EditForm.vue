<template>
  <form id="edit_form_task" method="post" >
        <h4> Enter New Task</h4>
        <small>Title should not be less than 5 letters.</small>
        <input type="text" id="title" value="" required>
        <br><br><small>Description should not be less than 10 characters.</small><br>
        <textarea type="text" id='description' value="" required></textarea>
        //radio button for completed
        <p><strong>Date Created: </strong></p>
        <p><strong>Date Completed: </strong></p>
        <br><br>
        <input type="submit" id="submit_button" value="Add">
        <br>
    </form>
</template>