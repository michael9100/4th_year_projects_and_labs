<template>
  <div>
    <b-form @submit="register">
      <b-form-group>
        <b-form-input class="was-validated" id="email"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Email">
        </b-form-input>
      </b-form-group>
      
      <b-form-group>
        <b-form-input id="displayName"
                      type="text"
                      v-model="form.displayName"
                      required
                      placeholder="Display Name">
        </b-form-input>
      </b-form-group>
      
      <b-form-group>
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Password">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input id="passwordRepeat"
                      type="password"
                      v-model="form.passwordRepeat"
                      required
                      placeholder="Repeat Password">
        </b-form-input>
      </b-form-group>
      <b-alert :show="showPasswordMatchError" variant="warning">Passwords must match!</b-alert>
      <b-button :disabled="!formFilled" type="submit" variant="outline-primary" class="float-right">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthService from '@/services/authService'
export default {
  data () {
    return {
      form: {
        email: '',
        displayName: '',
        password: null,
        repeatPassword: null,
      },
      showPasswordMatchError: null
    }
  },
  computed: {
    formFilled() {
      if (this.form.email != null && this.form.displayName != null && this.form.password != null) {
        if (this.form.password == this.form.passwordRepeat) {
          this.showPasswordMatchError = false          
          return true
        }
        else {
          this.showPasswordMatchError = true
          return false
        }
      }
      else {
        return false
      }
    }
  },
  methods: {
    async register (e) {
      try {
        e.preventDefault()
        const response = await AuthService.register(this.form)
      }
      catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
