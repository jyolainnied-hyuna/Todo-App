<template>
    <div class="task_containner" value="task_containner-id">
        <div class="todo" value="id">
            <p><strong>Title: </strong></p>
            <p><strong>Description: </strong></p>
            <p><strong>Status: </strong></p>
            <p><strong>Date Created: </strong></p>
            <p><strong>Date Completed: </strong></p>
        </div>
        <button @click="editTask" class="edit" value="id">Edit</button>
        <button class="delete" value="id">Delete</button>
    </div>
</template>


<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    editTask(){
      let form = "<app-form></app-form>";
      var result =form.replace("<app-form></app-form>", "<app-edit-form></app-edit-form>");
      document.getElementById('app').innertext;
    }

  }
}
</script>