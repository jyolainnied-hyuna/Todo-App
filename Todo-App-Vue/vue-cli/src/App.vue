<template>
  <div id="container">
    <h1>Todo Tracker</h1>
    <div id="main">
      <app-form></app-form>
      <h2 id="todo-header">Todos</h2>
        <div id="todoList">
           <task></task>
        </div>
      <button id="clear">Clear All</button>
    </div>
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

  }
}
</script>

