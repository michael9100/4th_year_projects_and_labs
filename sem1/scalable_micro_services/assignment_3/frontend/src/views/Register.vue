<template>
  <div class="page page-login">
    <b-container>
      <b-form @submit="onSubmit">
        <b-form-input
          class="mb-2"
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="example@example.com">
        </b-form-input>
        <b-form-input
          class="mb-2"
          id="password"
          type="password"
          v-model="form.password"
          required
          placeholder="Password">
        </b-form-input>
        <b-button type="submit" variant="outline-success" class="float-right">Register</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'register',
      'login'
    ]),
    async onSubmit (e) {
      e.preventDefault();
      await this.register(this.form)
      if (this.isLoggedIn) {
        console.log(true)
        await this.login(this.form)
      }
      this.$router.push('dashboard')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.loggedIn
    }
  },
}
</script>

<style lang="scss" scoped>

</style>


