<template>
  <div>
    <b-navbar type="light" variant="light" toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!isLoggedIn">
          <b-nav-item to="/register">Register</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item to="/register">Appointments</b-nav-item>
          <b-nav-item to="/login">Customers</b-nav-item>
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item @click="onLogout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'navigation',
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    async onLogout (e) {
      e.preventDefault();
      await this.logout()
      this.$router.push('login')
    }
  }
}
</script>

