<template>
  <div class="page page-blog-post">
    <!-- {{blogData}} -->
    <div class="inner-container">
      <div class="main-img" :style="{ 'background-image' : 'url(\'' + blogData.featuredImg + '\')' }">
      </div>
      <div class="blog-content-container">
        <h1>
          <span>
            {{blogData.title.toLowerCase()}}
          </span>
        </h1>
        <p>
          {{blogData.content}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogpost',
  computed: {
    blogData() {
      return this.$store.state.blogData[this.$route.params.id];
    },
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 64px;
}
.main-img {
  width: 100%;
  min-height: 200px;
  height: 22vh;
  background-position: center;
  background-size: cover;
}
.blog-content-container {
  max-width: 780px;
  margin: 0 auto;
}
h1 {
  font-size: 30px;
  font-family: 'Assistant', sans-serif;
  margin: 0 0 .7em; 

  span {
    color : var(--text-dark);
    text-decoration: none;
    position: relative;
    font-variant: small-caps;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      background: var(--orange);
      left: -6px;
      bottom: 0;
      height: 0.6em;
      z-index: -1;
      text-shadow: none;
    }
  }
}
p {
  line-height: 1.5em;
  padding-bottom: 2em;
}
</style>

