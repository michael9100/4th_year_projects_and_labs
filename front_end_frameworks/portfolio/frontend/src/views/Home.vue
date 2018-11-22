<template>
  <div class="page page-home">
    <div class="inner-container">
      <div class="row row-100">
        <div class="col col-50 center-v">
          <h1 class="brand">Michael O'Connell</h1>
          <p class="sub-brand">Full Stack Developer // Designer // Entrepreneur</p>
          <h2>About Me</h2>
          <p class="p-large">
            Hello, my name is Michael O'Connell, a web developer from Cork City in Ireland.
            I work mainly with JavaScript and it's ever growing list of frameworks. 
            Currently, I work mainly with <a href="https://vuejs.org/" target="_blank">Vue</a> 
            and <a href="https://expressjs.com/" target="_blank">Node</a>, feel free to check out my 
            <router-link to='/portfolio'>portfolio</router-link>. My interests are SAAS, 
            Entrepreneurship, and building useful tools, you can see my useful tools 
            <router-link to='/products'>here</router-link>. I am currently developing a SAAS product
            <a href="https://tattbooks.com/" target="_blank">TattBooks</a>, a tool to help Tattoo 
            Artists succeed. I'm also currently working as a part-time software developer for 
            <a href="https://www.teamwork.com/" target="_blank">Teamwork.com</a> while finishing 
            my final year of my BSc. If you to want to hire me you can download my 
            <a :href="`${baseUrl}michael_cv.pdf`" target="_blank">CV</a> and find my contact info 
            <router-link to='/contact'>here</router-link>.
          </p>
        </div>
        <div class="col mike-image">
          <div id="mike-svg"></div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vivus from 'vivus/dist/vivus.js';

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL
    }
  }
  // mounted() {
  //   console.log("test")
  //   // new Vivus('mike-svg', {duration: 200, file: 'assets/mike.svg'});
  //   new Vivus('my-svg', {
  //     type: "sync",
  //     animTimingFunction: Vivus.EASE,
  //     duration: 3000,
  //   });
  // }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 1.3em;
}

.mike-image {
  width: 50%;
  background-image: url(~@/assets/mike.jpeg);
  // background-image: url(~@/assets/mike.svg);
  background-repeat: no-repeat;
  background-position: left center;
  // background-position: center;
}

#mike-svg {
  margin-left: -500px;
}


@media(max-width:680px){
  .page {
    padding-top: 64px;
  }
}
</style>
