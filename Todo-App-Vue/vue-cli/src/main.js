import Vue from 'vue'
import App from './App.vue'
import FormSection from './components/Form.vue';
import Task from './components/Task.vue';
import EditForm from './components/EditForm.vue';


Vue.component('app-form', FormSection);
Vue.component('task', Task);
Vue.component('app-edit-form', EditForm);

new Vue({
  el: '#app',
  render: h => h(App)
})
