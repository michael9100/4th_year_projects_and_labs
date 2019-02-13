<template>
  <div id="app" class="container">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
  import navbar from '@/components/Navbar.vue'
  export default {
    components: {
      navbar,
    }
  }
</script>


<style lang="scss" >
@import 'src/scss/styles.scss';
</style>
