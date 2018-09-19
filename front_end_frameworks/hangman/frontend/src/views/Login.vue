<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group>
        <b-form-input 
          id="email"
          type="email"
          v-model="form.email"
          required
          placeholder="Email">
        </b-form-input>
      </b-form-group>
     
      <b-form-group>
        <b-form-input 
          id="password"
          type="password"
          v-model="form.password"
          required
          placeholder="Password">
        </b-form-input>
      </b-form-group>
      <b-button to="/register" variant="link">Register</b-button>
      <b-button type="submit" variant="outline-primary" class="float-right">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthService from "@/services/authService";
export default {
  data() {
    return {
      form: {
        email: "",
        password: null
      }
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      alert(JSON.stringify(this.form))
      try {
        const response = await AuthService.login(this.form)
        
        sessionStorage.setItem("user", JSON.stringify(response.data));

        if (sessionStorage.getItem("user") != null) {
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } 
          else {
            this.$router.push("/");
          }
        }
        console.log("response:", response);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
