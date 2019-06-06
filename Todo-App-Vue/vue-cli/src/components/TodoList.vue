<template>
<div id="todoList">
    <task></task>
</div>
</template>

<script>
    import Task from './Task.vue';

    export default{
        components:{
            'task': Task
        }
    }
</script>