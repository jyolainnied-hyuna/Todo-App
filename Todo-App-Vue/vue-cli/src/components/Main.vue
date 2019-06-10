<template>
  <div id="main">
    <app-form></app-form>
  </div>
</template>

<script>
    import FormSection from './components/Form.vue';

    export default {
    components: {
        'app-form': FormSection
    }
}
</script>