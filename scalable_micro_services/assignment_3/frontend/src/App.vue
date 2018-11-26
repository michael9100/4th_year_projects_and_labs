<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  .page {
    padding-top: 15px;
  }
}
</style>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Navbar
  },
  methods: {
    ...mapActions([
      'setLoggedIn'
    ]),
  },
  mounted() {
    if (sessionStorage.getItem('tattbooksAuth') != null) {
      this.setLoggedIn(true)
    }
    else {
      this.setLoggedIn(false)
    }
  }
}
</script>
